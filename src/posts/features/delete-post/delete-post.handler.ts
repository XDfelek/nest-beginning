import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaProviderService } from 'src/prisma/services/prisma-provider/prisma-provider.service';
import { ApiError } from 'src/utils/errors';
import { Err, Ok, Result } from 'ts-results-es';

import DeletePostCommand from './delete-post.command';
import { DeletePostDto } from './delete-post.dto';

@CommandHandler(DeletePostCommand)
export default class DeletePostCommandHandler
  implements ICommandHandler<DeletePostCommand, Result<DeletePostDto, ApiError>>
{
  constructor(private readonly prisma: PrismaProviderService) {}

  async execute(
    command: DeletePostCommand,
  ): Promise<Result<DeletePostDto, ApiError>> {
    const { creatorId, postId } = { ...command };

    const post = await this.prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post)
      return new Err({ code: HttpStatus.NOT_FOUND, message: 'Post not found' });

    if (post.creatorId != creatorId)
      return new Err({
        code: HttpStatus.FORBIDDEN,
        message: 'You have no rights',
      });

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return Ok({ postId });
  }
}
