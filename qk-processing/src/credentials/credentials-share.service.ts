import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { CredentialShare, Credential } from "@prisma/client";
import { Queue } from "bull";

import { CredentialsShareRequestDto } from "./dto";
import { CredentialsShareFactory } from "./factory/credentials-share.factory";

@Injectable()
export class CredentialsShareService {
  constructor(
      @InjectQueue("credentials-notify") private credentialsNotifyQueue: Queue,
      private credentialsShareFactory: CredentialsShareFactory,
  ) {
  }

  /**
   * Process credentials share
   */
  public async processCredentialsShare(dto: CredentialsShareRequestDto, credentialsList: Credential[]): Promise<CredentialShare> {
    const credentialsShare = await this.credentialsShareFactory.create(dto, credentialsList);

    if (0 !== dto.recipientEmails.length) {
      // Send email with credentials share to recipients
      dto.recipientEmails.forEach((recipientEmail: string) => {
        Logger.debug(`Dispatching credential share email to: ${recipientEmail}`);
        this.credentialsNotifyQueue.add("credentials-share", {
          recipientEmail: recipientEmail,
          temporaryPassword: credentialsShare.temporaryPassword,
        });
      });
    }

    return credentialsShare;
  }
}