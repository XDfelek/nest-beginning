import { ICommand } from '@nestjs/cqrs';

export default class DeletePostCommand implements ICommand {
  constructor(
    public readonly creatorId: string,
    public readonly postId: string,
  ) {}
}
