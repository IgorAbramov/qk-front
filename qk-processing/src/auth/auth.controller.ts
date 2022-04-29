import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, Req, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { JwtGuard } from "./guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("register")
  register(@Body() dto: AuthDto): Promise<{ uuid: string, email: string, createdAt: Date }> {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() dto: AuthDto, @Res({ passthrough: true }) response: Response ): Promise<string> {
    return this.authService.login(dto, response);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get("test1")
  test1(@Req() request: Request):string {
    console.log(request);
    if (request.cookies["jwt"]) {
      console.log(JSON.parse(JSON.stringify(request?.cookies["jwt"])));
    }
    return JSON.stringify({ ok: "ok" });
  }
}