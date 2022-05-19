import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { FieldsEncryptType } from "./type/fields.encrypt.type";

/**
 * Class responsible for getting credentials from the data sources
 */
@Injectable()
export class CredentialsRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  getStudentCredentials(user: User): string {
    return JSON.stringify({
      value: `Student dashboard page! Welcome, ${user.email}`,
      role: user.role,
    });
  }

  getInstitutionCredentials(user: User): string {
    return JSON.stringify({
      value: `Institution dashboard page! Welcome, ${user.email}`,
      role: user.role,
    });
  }
  
  async getCredentialsEncryptedFields(uuid: string): Promise<FieldsEncryptType> {
    return this.prismaService.credential.findUnique({
      where:{ uuid },
      select: {
        certificateId: true,
        graduatedName: true,
        authenticatedBy: true,
        qualificationName: true,
        majors: true,
        minors: true,
        authenticatedTitle: true,
        awardingInstitution: true,
        qualificationLevel: true,
        awardLevel: true,
        studyLanguage: true,
        info: true,
        gpaFinalGrade: true,
        authenticatedAt: true,
        studyStartedAt: true,
        studyEndedAt: true,
        graduatedAt: true,
        expiresAt: true,
      },
    });
  }
}
