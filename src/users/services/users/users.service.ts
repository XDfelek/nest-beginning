import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PrismaProviderService } from 'src/prisma/services/prisma-provider/prisma-provider.service';
import { GetUsersElem } from 'src/users/dto/get-users';

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

  async CreateUser(params: );
}
