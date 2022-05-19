import { GoneException, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { OneTimePassword, User } from "@prisma/client";

import { OtpResponseDto } from "../../../src/auth/dto";
import { OtpService } from "../../../src/auth/otp.service";
import { AwsSesService } from "../../../src/aws/aws.ses.service";
import { UserNotFoundException } from "../../../src/common/exception";
import { PrismaService } from "../../../src/prisma/prisma.service";

describe("OtpService Unit Test", () => {
  let service: OtpService;
  let prismaService: PrismaService;
  let ses: AwsSesService;
  
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
  
  const userMockFindUnique: User = {
    uuid: "e7c66694-648e-4195-9558-b27b1a061512",
    email: "a@k.lv",
    password: "123",
    role: "STUDENT",
    createdAt: new Date(1652991260 * 1000),
    updatedAt: new Date(1652991260 * 1000),
    lastLoginAt: null,
    firstName: "A",
    lastName: "K",
    institutionUuid: "413989c5-151b-4b18-980c-a5ecf78028dc",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpService, {
        provide: PrismaService,
        useValue: {
          oneTimePassword: {
            findUnique: jest.fn().mockReturnValue(Promise.resolve(otpMockFindUnique)),
            create: jest.fn().mockReturnValue(Promise.resolve(otpMockFindUnique)),
            delete: jest.fn(),
          }, 
          user: { findUnique: jest.fn().mockReturnValue(Promise.resolve(userMockFindUnique)) },
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
    ses = module.get<AwsSesService>(AwsSesService);
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("sendOtp() - unit", () => {

    it("Should send email and return OtpResponseDto", async () => {
      await service.sendOtp(userMockFindUnique.email, 1);
      expect(ses.sendOtpEmail).toBeCalledTimes(1);
      expect(ses.sendOtpEmail).toBeCalledWith(userMockFindUnique.email, otpMockFindUnique.code);
      expect(await service.sendOtp(userMockFindUnique.email, 1)).toEqual(
        new OtpResponseDto(otpMockFindUnique.uuid, otpMockFindUnique.validUntil, otpMockFindUnique.canBeResentAt),
      );
    });

    it("Should throw UserNotFoundException", () => {
      const mockPrismaFindUnique = jest.fn().mockReturnValue(Promise.resolve(null));
      jest
        .spyOn(prismaService.user, "findUnique")
        .mockImplementation(mockPrismaFindUnique);
      
      expect(async () => await service.sendOtp(userMockFindUnique.email, 1)).rejects.toThrowError(
        new UserNotFoundException(userMockFindUnique.email),
      );
    });
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
      
      expect(async () => await service.checkOtp(otpMockExpired.code, otpMockExpired.uuid)).rejects.toThrowError(
        new GoneException("code expired"),
      );
    });

    it("Should throw UnprocessableEntityException", () => {
      expect(async () => await service.checkOtp("0000", otpMockFindUnique.uuid)).rejects.toThrowError(
        new UnprocessableEntityException("incorrect code"),
      );
    });
  });
});