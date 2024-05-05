import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import RequestWithUser from './interfaces/request-with-user.interface';
import { Response } from 'express';
import RefreshTokenGuard from './guards/refresh-token.guard';
import { ConfigService } from '@nestjs/config';
import AccessTokenGuard from './guards/access-token.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const { accessToken, refreshToken } =
      await this.authenticationService.getTokensWithUser(user.id);
    const cookie = `Authentication=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send({ ...user, accessToken });
  }

  @HttpCode(200)
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authenticationService.getTokensWithUser(request.user.id);
    const cookie = `Authentication=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    response.setHeader('Set-Cookie', cookie);
    return response.send({ ...user, accessToken });
  }

  @UseGuards(AccessTokenGuard)
  @Get('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }
}
