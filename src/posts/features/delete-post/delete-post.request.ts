import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeletePostRequest {
  @ApiProperty()
  postId: string;
}
