import { ApiPropertyOptional } from '@nestjs/swagger';

class GetUsersQuery {
  @ApiPropertyOptional({
    description: 'Searches users with age above that number',
  })
  minAge?: number;
}

class GetUsersElem {
  id: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  age: number;
}

export { GetUsersElem, GetUsersQuery };
