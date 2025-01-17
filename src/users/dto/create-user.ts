import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

class CreateUserBody {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  dateOfBirth: Date;
  @ApiProperty()
  @IsStrongPassword()
  password: string;
}

class CreateUserResponse {
  id: string;
}

export { CreateUserBody, CreateUserResponse };
