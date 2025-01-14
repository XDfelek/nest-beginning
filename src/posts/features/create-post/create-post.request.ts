import { ApiProperty } from '@nestjs/swagger';

export class CreatePostRequest {
  @ApiProperty()
  content: string;
  @ApiProperty()
  tags: string;
}
