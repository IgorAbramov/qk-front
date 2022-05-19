import { Module } from "@nestjs/common";

import { HederaController } from "./hedera.controller";
import { HederaService } from "./hedera.service";

@Module({
  providers: [HederaService],
  controllers: [HederaController],
})
export class HederaModule {}
