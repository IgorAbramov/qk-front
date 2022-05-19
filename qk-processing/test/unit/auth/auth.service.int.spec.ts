import { Test } from "@nestjs/testing";

import { AppModule } from "../../../src/app.module";
import { AuthService } from "../../../src/auth/auth.service";
import { AuthRequestDto } from "../../../src/auth/dto";
import { PrismaService } from "../../../src/prisma/prisma.service";

describe("AuthService Int", () => {
  let prisma: PrismaService;
  let authService: AuthService;

  const newUserMock: AuthRequestDto = {
    email: "email@email.com",
    password: "password",
    rememberMe: false,
    otp: "",
    otpUuid: "",
  };
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    authService = moduleRef.get<AuthService>(AuthService);
    // await prisma.cleanDatabase();
  });

  describe("Register User", () => {
    it("Should create a new user", async() => {
      const user = await authService.register(newUserMock);
      expect(user.email).toBe("email@email.com");
    });
    it("Should throw an error on duplicate email", async () => {
      try {
        await authService.register(newUserMock);
      } catch (error) {
        expect(error.status).toBe(403);
      }
    });
  });

  // describe("Login User", () => {
  //   it("Should login existent user", async () => {
  //     const user = await authService.login(newUserMock, response);
  //   });
  // });
  
});