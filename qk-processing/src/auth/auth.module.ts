import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RouteProvider } from "./provider";
import { JwtStrategy } from "./strategy";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RouteProvider],
})
export class AuthModule {

}