import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

import { CreateUserBody } from './dto/create-user';
import { GetUsersElem, GetUsersQuery } from './dto/get-users';
import { UsersService } from './services/users/users.service';

@Controller('users')
export class UsersController {
  //w kontrolerach nie może być żadnej logiki
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser() {}

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Get()
  async getUsers(@Query() query: GetUsersQuery): Promise<GetUsersElem[]> {
    return await this.usersService.GetUsers(query);
  }

  // 1. Endpoint do tworzenia pojedyńczego użytkownika, body takie jak w create-user
  // 2. hasło ma być hashowane patrz https://docs.nestjs.com/security/encryption-and-hashing
  // 3. w hashu powinny być 1 salt, 1 generowany dla każdego użytkownika osobno
  // 4. powinny byc podstawowe walidacje typu mail etc
  // 5. zwraca id usera
  @Post()
  @ApiBody({ type: CreateUserBody })
  async createUser(@Body() body: CreateUserBody) {
    const res = await this.usersService.CreateUser(body);

    if (res.isOk()) {
      return res.value;
    } else {
      throw new BadRequestException(res.error);
    }
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
