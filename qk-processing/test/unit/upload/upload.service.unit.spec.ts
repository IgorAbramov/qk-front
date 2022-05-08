import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "@prisma/client";

import { PrismaService } from "../../../src/prisma/prisma.service";
import { UploadService } from "../../../src/upload/upload.service";

type Upload = {
  filename: string
  mapping: string
  uploadedBy: User
}

describe("UploadService Unit Test", () => {
  let service: UploadService;

  const mockInstitution = {
    uuid: "uuidv4",
    status: "ACTIVE",
    emailDomain: "ok@ok.de",
    logoUrl: "",
    name: "",
    createdAt: new Date(1651188244),
    updatedAt: new Date(1651188244),
    representatives: ["uuidv4"],
  };
  
  const mockUpload: Upload = {
    filename: "test34-5345-2345fs.csv",
    mapping: "authenticatedAt,authenticatedBy,graduatedName,awardLevel,qualificationLevel,,,,,qualificationName,gpaFinalGrade,awardingInstitution,studyStartedAt,graduatedAt,expiresAt,studyEndedAt",
    uploadedBy: {
      uuid: "uuidv4",
      email: "institution@institution.com",
      password: "1234",
      role: "INSTITUTION_REPRESENTATIVE",
      createdAt: new Date(1651188244),
      updatedAt: new Date(1651188244),
      firstName: "",
      lastName: "",
      institutionUuid: "e1ae2732-08e1-4af0-a7db-33f10b1e84fe",
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService, ConfigService, {
        provide: PrismaService,
        useValue: {
          institution: { findUnique: jest.fn().mockReturnValue(Promise.resolve(mockInstitution)) },
          upload: { create: jest.fn().mockReturnValue(Promise.resolve(mockUpload)) },
        },
      }, {
        provide: EventEmitter2,
        useValue: { emit: jest.fn() },
      },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("processUpload() - unit", () => {
    const user: User = {
      uuid: "uuidv4",
      email: "institution@institution.com",
      password: "1234",
      role: "INSTITUTION_REPRESENTATIVE",
      createdAt: new Date(1651188244),
      updatedAt: new Date(1651188244),
      firstName: "",
      lastName: "",
      institutionUuid: "e1ae2732-08e1-4af0-a7db-33f10b1e84fe",
    };
    const upload: Upload = {
      filename: "test34-5345-2345fs.csv",
      mapping: "authenticatedAt,authenticatedBy,graduatedName,awardLevel,qualificationLevel,,,,,qualificationName,gpaFinalGrade,awardingInstitution,studyStartedAt,graduatedAt,expiresAt,studyEndedAt",
      uploadedBy: user,
    };
    it("Should process file upload", async () => {
      expect(await service.processUpload(upload.filename, upload.mapping, upload.uploadedBy)).toReturn();
    });
  });
});