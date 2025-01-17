import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeletePostRequest {
  @ApiProperty()
  @IsNotEmpty()
  postId: string;
}
