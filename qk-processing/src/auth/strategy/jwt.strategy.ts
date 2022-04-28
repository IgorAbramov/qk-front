import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";

import { PrismaService } from "../../prisma/prisma.service";

type JwtPayload = {
  sub: string,
  email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //TODO: Extract should be done from cookies!
      secretOrKey: config.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { uuid: payload.sub } });
    
    delete user.password;
    return user;
  }
}