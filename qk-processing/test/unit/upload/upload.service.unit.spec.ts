import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../../../src/prisma/prisma.service";
import { UploadService } from "../../../src/upload/upload.service";

describe("UploadService Unit", () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService, ConfigService, {
        provide: PrismaService,
        useValue: {
          institution: { findUnique: jest.fn() },
          upload: { create: jest.fn() },
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
});