import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";

import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { CredentialsService } from "./credentials.service";

@Controller("credentials")
@UseGuards(JwtGuard)
export class CredentialsController {
  constructor(private credentialsService: CredentialsService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
  getCredentials(@GetUser() user: User):string {
    console.log(user);
    return this.credentialsService.getCredentials(user);
  }
}
