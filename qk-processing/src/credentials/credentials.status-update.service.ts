import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CredentialStatus } from "@prisma/client";

import { CredentialsNotFoundException } from "../common/exception";
import { PrismaService } from "../prisma/prisma.service";
import { CredentialsActivatedEvent } from "./event";

/**
 * Class for updating credentials statuses
 */
@Injectable()
export class CredentialsStatusUpdateService {
  constructor(
        private readonly prisma: PrismaService,
        private eventEmitter: EventEmitter2,
  ) {
  }

  public async toActivated(uuid: string): Promise<void> {
    const credentials = await this.prisma.credential.findUnique({
      where: { uuid: uuid },
      include: { student: true },
    });

    if (null === credentials) {
      throw new CredentialsNotFoundException(uuid);
    }

    if (credentials.status !== CredentialStatus.UPLOADED_TO_BLOCKCHAIN) {
      Logger.warn("Wrong credentials status");
      return;
    }

    await this.prisma.credential.update({
      data: { status: CredentialStatus.ACTIVATED },
      where: { uuid: uuid },
    });

    Logger.debug(`Credentials ${uuid} status changed to ACTIVATED`);

    const credentialsActivatedEvent = new CredentialsActivatedEvent();
    credentialsActivatedEvent.credentials = credentials;
    credentialsActivatedEvent.student = credentials.student;
    this.eventEmitter.emit("credentials.activated", credentialsActivatedEvent);
  }
}