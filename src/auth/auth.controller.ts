import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestBody } from './dto/sign-in';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() body: SignInRequestBody) {
    const res = await this.authService.SignIn(body);

    if (res.isOk()) {
      return res.value;
    } else {
      return res.error;
    }
  }
}
