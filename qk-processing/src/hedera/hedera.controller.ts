import { Controller, UseGuards } from "@nestjs/common";

import { JwtGuard } from "../auth/guard";
import { HederaService } from "./hedera.service";

@UseGuards(JwtGuard)
@Controller("hedera")
export class HederaController {
  constructor(
        private readonly hederaService: HederaService,
  ) {}
}
