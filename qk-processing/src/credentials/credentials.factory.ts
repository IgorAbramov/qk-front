import { Injectable } from "@nestjs/common";
import { CredentialStatus, User, Credential } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

type mockDataType = {
    email: string
    institutionUuid: string
    authenticatedBy: string
    qualificationLevel: string
    qualificationName: string
    graduatedName: string
}

@Injectable()
export class CredentialsFactory {
  constructor(
        private prismaService: PrismaService,
  ) {
  }

  async createCredentials(user: User, did: string, data: mockDataType): Promise<Credential> {
    return await this.prismaService.credential.create({
      data: {
        did,
        status: CredentialStatus.NEW,
        studentUuid: user.uuid,
        institutionUuid: data.institutionUuid,
        certificateId: "certificated-id",
        graduatedName: data.graduatedName,
        authenticatedBy: data.authenticatedBy,
        qualificationName: data.qualificationName,
        majors: "",
        minors: "",
        authenticatedTitle: "",
        awardingInstitution: "Riga School of Engineering",
        qualificationLevel: data.qualificationLevel,
        awardLevel: "Honors",
        studyLanguage: "Spanish",
        info: "",
        gpaFinalGrade: "9.1",
        studyStartedAt: new Date(1117372840),
        studyEndedAt: new Date(1117372840),
        graduatedAt: new Date(1117372840),
      },
    });
  }
}