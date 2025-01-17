import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostRequest {
  @ApiProperty()
  @MinLength(5)
  content: string;
  @ApiProperty()
  @IsNotEmpty()
  tags: string;
}
