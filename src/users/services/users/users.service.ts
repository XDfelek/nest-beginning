import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { PrismaProviderService } from 'src/prisma/services/prisma-provider/prisma-provider.service';
import { CreateUserBody, CreateUserResponse } from 'src/users/dto/create-user';
import { GetUsersElem } from 'src/users/dto/get-users';
import { BaseError } from 'src/utils/errors';
import { Err, Ok, Result } from 'ts-results-es';

@Injectable() //wstrzyknij prisma provider service
export class UsersService {
  //w serwisach jest cała logika
  constructor(private readonly prisma: PrismaProviderService) {} // to samo co public UserService(PrismaPrividerService prismaProvider){}

  // 1. endpoint GET /users/ ma zwracać listę użytkowników wg kryteriów zdefiniowanych w GetUsersQuery
  // 2. Utworzyć nową klase w dto/get-users.ts GetUsersDto ma mieć pola {name, age, dateOfBirth, email, id}
  // 3. Metoda get users ma wyszukać wg kryteriów i zwrócić ZMAPOWANE dane do kontrolera
  // 4. Otypować response tego endpointa w nescie (swagger) (google)
  async GetUsers(params: { minAge?: number }): Promise<GetUsersElem[]> {
    const data = await this.prisma.user.findMany({
      where: {
        dateOfBirth: {
          lt: params.minAge
            ? new Date(
                new Date().getFullYear() - params.minAge,
                new Date().getMonth(),
                new Date().getDate(),
              )
            : undefined,
        },
      },
    });

    return data.map((x) => {
      return {
        id: x.id,
        name: x.name,
        surname: x.surname,
        dateOfBirth: x.dateOfBirth,
        age: moment().diff(x.dateOfBirth, 'years'),
      };
    });
    //zwróc liste użytkowników wg kryteriów
  }

  async DeleteUser() {}

  async CreateUser(
    params: CreateUserBody,
  ): Promise<Result<CreateUserResponse, BaseError>> {
    //dodać walidacje
    const salt = await bcrypt.genSalt();

    if (
      (await this.prisma.user.count({ where: { email: params.email } })) > 0
    ) {
      return new Err({ message: 'User with this email already exists!' });
    }

    const createdUser = await this.prisma.user.create({
      data: {
        name: params.name,
        surname: params.surname,
        email: params.email,
        dateOfBirth: params.dateOfBirth,
        passwordHash: await bcrypt.hash(params.password, salt),
      },
    });

    return new Ok({ id: createdUser.id });
  }
}
