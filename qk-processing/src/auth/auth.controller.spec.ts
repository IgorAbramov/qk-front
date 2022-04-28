import { Test, TestingModule } from "@nestjs/testing";
import { response } from "express";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

describe("AuthController Unit Test", () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(():string => {
      return "/route-to-be-redirected";
    }),
    register: jest.fn(() => {
      return {
        uuid: "uuid",
        email: "email@email.com",
        createdAt: new Date(),
      };
    }),
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();
    
    controller = module.get<AuthController>(AuthController);
  });

  it("Should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("Should register a user", () => {
    const dto = new AuthDto;
    const user: { uuid: string, email: string, createdAt: Date } = {
      uuid: "uuid",
      email: "email@email.com",
      createdAt: new Date(),
    };
    expect(controller.register(dto)).toEqual(user);
    expect(mockAuthService.register).toHaveBeenCalledTimes(1);
  });

  it("Should login a user", () => {
    const dto = new AuthDto;
    expect(controller.login(dto, response)).toEqual("/route-to-be-redirected");
    expect(mockAuthService.login).toHaveBeenCalledTimes(1);
  });
});