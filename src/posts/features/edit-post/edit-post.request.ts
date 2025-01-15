import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EditPostRequest {
  @ApiProperty()
  postId: string;
  @ApiPropertyOptional()
  content?: string;
  @ApiPropertyOptional()
  tags?: string;
}
