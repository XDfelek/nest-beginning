import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaProviderService } from 'src/prisma/services/prisma-provider/prisma-provider.service';
import { BaseError } from 'src/utils/errors';
import { Err, Ok, Result } from 'ts-results-es';

import { SignInRequestBody, SignInResponse } from './dto/sign-in';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaProviderService,
    private readonly jwtService: JwtService,
  ) {}

  async SignIn(
    data: SignInRequestBody,
  ): Promise<Result<SignInResponse, BaseError>> {
    const { email, password } = data;
    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return new Err({ message: 'Invalid credentials' });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return new Err({ message: 'Invalid credentials' });
    }

    const payload = {
      sub: user.id,
      email: user.email,
      fullName: `${user.name} ${user.surname}`,
    };

    //expires do zmiany
    return new Ok({
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '2 days',
      }),
    });
  }
}
