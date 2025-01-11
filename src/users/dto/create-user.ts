import { ApiProperty } from '@nestjs/swagger';

class CreateUserBody {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  dateOfBirth: Date;
  @ApiProperty()
  password: string;
}

class CreateUserResponse {
  id: string;
}

export { CreateUserBody, CreateUserResponse };
