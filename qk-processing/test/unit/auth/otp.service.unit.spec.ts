import { GoneException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { OneTimePassword } from "@prisma/client";

import { OtpService } from "../../../src/auth/otp.service";
import { AwsSesService } from "../../../src/aws/aws.ses.service";
import { PrismaService } from "../../../src/prisma/prisma.service";

describe("OtpService Unit Test", () => {
  let service: OtpService;
  let prismaService: PrismaService;
  
  const otpMockFindUnique: OneTimePassword = {
    uuid: "baa3261d-b36a-4d5d-9f26-5fce27321df8",
    code: "3540",
    validUntil: new Date(1752996087 * 1000),
    canBeResentAt: new Date(1652991260 * 1000),
  };

  const otpMockExpired: OneTimePassword = {
    uuid: "baa3261d-b36a-4d5d-9f26-5fce27321df8",
    code: "3540",
    validUntil: new Date(1652991131 * 1000),
    canBeResentAt: new Date(1652991260 * 1000),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpService, {
        provide: PrismaService,
        useValue: {
          oneTimePassword: {
            findUnique: jest.fn().mockReturnValue(Promise.resolve(otpMockFindUnique)),
            delete: jest.fn(),
          }, 
        },
      },
      {
        provide: AwsSesService,
        useValue: { sendOtpEmail: jest.fn() }, 
      },
      ],
    }).compile();

    service = module.get<OtpService>(OtpService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("checkOtp() - unit", () => {
    it("Should check if code is correct", async () => {
      await service.checkOtp(otpMockFindUnique.code, otpMockFindUnique.uuid);
      expect(prismaService.oneTimePassword.delete).toBeCalledTimes(1);
    });
    it("Should throw NotFoundException", () => {
      const mockPrismaFindUnique = jest.fn().mockReturnValue(Promise.resolve(null));
      jest
        .spyOn(prismaService.oneTimePassword, "findUnique")
        .mockImplementation(mockPrismaFindUnique);

      expect(async () => await service.checkOtp(otpMockFindUnique.code, otpMockFindUnique.uuid)).rejects.toThrowError(
        new NotFoundException("code not found"),
      );
    });
    it("Should throw GoneException", () => {
      const mockPrismaFindUnique = jest.fn().mockReturnValue(Promise.resolve(otpMockExpired));
      jest
        .spyOn(prismaService.oneTimePassword, "findUnique")
        .mockImplementation(mockPrismaFindUnique);
      
      expect(async () => await service.checkOtp(otpMockExpired.code, otpMockExpired.uuid)).rejects.toThrowError(new GoneException("code expired"));
    });
    it("Should throw UnprocessableEntityException", () => {
      expect(async () => await service.checkOtp("0000", otpMockFindUnique.uuid)).rejects.toThrowError(new UnprocessableEntityException("incorrect code"));
    });
  });
});