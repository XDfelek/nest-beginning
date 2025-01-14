import { ApiProperty } from '@nestjs/swagger';

class CreateUserBody {
  name: string;
  surname: string;
  email: string;
  dateOfBirth: Date;
  password: string;
}

class CreateUserResponse {
  id: string;
}

export { CreateUserBody, CreateUserResponse };
