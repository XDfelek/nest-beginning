import { ApiProperty } from '@nestjs/swagger';

class CreateUserBody {
  @ApiProperty()
  name: String;
  @ApiProperty()
  surname: String;
  @ApiProperty()
  email: String;
  @ApiProperty()
  dateOfBirth: Date;
  @ApiProperty()
  password: String;
}

export { CreateUserBody };
