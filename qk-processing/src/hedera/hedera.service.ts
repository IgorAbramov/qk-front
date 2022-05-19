import { HcsIdentityNetworkBuilder } from "@hashgraph/did-sdk-js";
import { Client, PublicKey } from "@hashgraph/sdk";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HederaService {
  constructor(
        private configService: ConfigService,
        private prismaService: PrismaService,
        private config: ConfigService,
  ) {
  }

  getCredentials(): void {
    console.log("return credentials");
  }

  setCredentials(): void {
    console.log("set credentials");
  }

  async generateDid(): Promise<string> {
    const accountId = this.config.get<string>("HEDERA_ACCOUNT_ID");
    const privateKey = this.config.get<string>("HEDERA_PRIVATE_KEY");
    const publicKey = this.config.get<string>("HEDERA_PUBLIC_KEY");

    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);
    
    while (true) {
      try {
        const identityNetwork = await new HcsIdentityNetworkBuilder()
          .setNetwork("testnet")
          .setPublicKey(PublicKey.fromString(publicKey))
          .execute(client);
        
        const did = identityNetwork.generateDid(true).toDid();
        Logger.debug(`DID created ${did}`);
        return did;
        
      } catch (err) {
        Logger.error(err, err.stack);
        if (err.name === "TypeError") throw new RuntimeException();
      }
    }
  }
}
