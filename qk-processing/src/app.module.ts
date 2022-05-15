import { AdminModule, AdminModuleOptions } from "@adminjs/nestjs";
import { Database, Resource } from "@adminjs/prisma";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ThrottlerModule } from "@nestjs/throttler";
import { Role } from "@prisma/client";
import { DMMFClass } from "@prisma/client/runtime";
import AdminJS, { CurrentAdmin } from "adminjs";

import { AuthModule } from "./auth/auth.module";
import { AwsModule } from "./aws/aws.module";
import { CredentialsModule } from "./credentials/credentials.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs");

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env.local", ".env"] }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UserModule,
    PrismaModule,
    CredentialsModule,
    AdminModule.createAdminAsync({
      imports: [PrismaModule],
      inject: [PrismaService],
      useFactory: async (prisma: PrismaService): Promise<AdminModuleOptions> => {
        const dmmf = ((prisma as any)._dmmf as DMMFClass);
        return {
          adminJsOptions: {
            rootPath: "/admin",
            resources: [
              {
                resource: { model: dmmf.modelMap.User, client: prisma },
                options: {},
              },
            ],
          },
          auth: {
            authenticate: async (email: string, password: string): Promise<CurrentAdmin> => {
              if (email !== "" && password !== "") {
                const user = await prisma.user.findUnique({ where: { email: email } });
                if (user && user.role === Role.SUPER_ADMIN) {
                  if (bcrypt.compareSync(
                    password,
                    user?.password,
                    (err, res) => {
                      console.log(err, res);
                    },
                  )) {
                    return Promise.resolve<CurrentAdmin>({ email: email });
                  }
                }
              }
            },
            cookieName: "admin",
            cookiePassword: "admin",
          },
        };
      },
    }),
    RedisModule.forRoot({
      closeClient: true,
      config: {
        host: "redis",
        port: 6379,
      },
    }),
    BullModule.forRoot({
      redis: {
        host: "redis",
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: "credentials-create" }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get("THROTTLE_TTL"),
        limit: config.get("THROTTLE_LIMIT"),
      }),
    }),
    UploadModule,
    AwsModule,
  ],
})
export class AppModule {
}
