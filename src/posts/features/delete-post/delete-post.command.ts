import { ApiProperty } from '@nestjs/swagger';

export default class DeletePostCommand {
  constructor(
    public readonly creatorId: string,
    public readonly postId: string,
  ) {}
}
