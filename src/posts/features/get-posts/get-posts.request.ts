import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetPostsRequest {
  //to dostajemy od api
  @ApiPropertyOptional()
  creatorId?: string;
  @ApiPropertyOptional()
  minCreatedAt?: Date;
  @ApiPropertyOptional()
  maxCreatedAt?: Date;
}
