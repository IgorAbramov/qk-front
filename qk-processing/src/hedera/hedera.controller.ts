import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";

import { JwtGuard } from "../auth/guard";
import { HederaService } from "./hedera.service";

@UseGuards(JwtGuard)
@Controller("hedera")
export class HederaController {
  constructor(
        private hederaService: HederaService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Get("test")
  test(): Promise<string> {
    return this.hederaService.setCredentials();
  }
}
