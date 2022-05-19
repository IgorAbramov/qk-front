import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { Role, User } from "@prisma/client";

import { HederaService } from "../hedera/hedera.service";
import { PrismaService } from "../prisma/prisma.service";
import { CredentialsFactory } from "./credentials.factory";
import { CredentialsRepository } from "./credentials.repository";

const mockDataCredentials = {
  email: "a@k.lv",
  institutionUuid: "89f43c8f-1434-4caf-92bd-990b3f112da1",
  authenticatedBy: "4728859d-622b-4ec0-8f60-75caa0d17c13",
  qualificationLevel: "Bachelors",
  qualificationName: "Bachelor of Web3 Development",
  graduatedName: "Andrew Kramer",
};

/**
 * Master class for the work related to credentials
 */
@Injectable()
export class CredentialsService {
  constructor(
        private readonly credentialsRepository: CredentialsRepository,
        private readonly credentialsFactory: CredentialsFactory,
        private readonly prismaService: PrismaService,
        private readonly hederaService: HederaService) {
  }

  getCredentials(user: User): string {
    if (user.role === Role.STUDENT) return this.credentialsRepository.getStudentCredentials(user);
    if (user.role === Role.INSTITUTION_REPRESENTATIVE) return this.credentialsRepository.getInstitutionCredentials(user);

    throw new ForbiddenException();
  }

  async mapCredentials(): Promise<void> {
    //Suppose credentials are mapped

    const user = await this.prismaService.user.findUnique({
      where: { email: mockDataCredentials.email },
      include: { credentials: true },
    });
    if (!user) {
      const newUser = await this.prismaService.user.create({
        data: {
          email: mockDataCredentials.email,
          role: Role.STUDENT,
        },
      });

      const did = await this.hederaService.generateDid();
      const newCredential = await this.credentialsFactory.createCredentials(newUser, did, mockDataCredentials);
      const fieldsToEncrypt = await this.credentialsRepository.getCredentialsEncryptedFields(newCredential.uuid);
      await this.hederaService.saveCredentialsToSmartContract(fieldsToEncrypt);

    } else {
      user.credentials.map(c => {
        if (
          c.institutionUuid === mockDataCredentials.institutionUuid &&
                    c.qualificationLevel === mockDataCredentials.qualificationLevel &&
                    c.qualificationName === mockDataCredentials.qualificationName &&
                    c.graduatedName === mockDataCredentials.graduatedName
        ) {
          Logger.error(`Adding the same credentials for user ${user.email}`);
          throw new ForbiddenException(`Adding the same credentials for user ${user.email}`);
        }
      });

      const did = await this.hederaService.generateDid();
      const newCredential = await this.credentialsFactory.createCredentials(user, did, mockDataCredentials);
      const fieldsToEncrypt = await this.credentialsRepository.getCredentialsEncryptedFields(newCredential.uuid);
      await this.hederaService.saveCredentialsToSmartContract(fieldsToEncrypt);
    }
  }
}
