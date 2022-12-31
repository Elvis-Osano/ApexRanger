import { Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import JwtAuthGuard from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import User from "./users/entities/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern("validate_user")
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
