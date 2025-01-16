import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import DeletePostCommand from './delete-post.command';
import { Err, Ok, Result } from 'ts-results-es';
import { DeletePostDto } from './delete-post.dto';
import { PrismaProviderService } from 'src/prisma/services/prisma-provider/prisma-provider.service';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@CommandHandler(DeletePostCommand)
export default class DeletePostCommandHandler
  implements
    ICommandHandler<DeletePostCommand, Result<DeletePostDto, BaseError>>
{
  constructor(private readonly prisma: PrismaProviderService) {}

  async execute(
    command: DeletePostCommand,
  ): Promise<Result<DeletePostDto, BaseError>> {
    const { creatorId, postId } = { ...command };
    if (!postId) {
      return Err({ message: 'Invalid postId: postId is required' });
    }
    try {
      await this.prisma.post.delete({
        where: {
          creatorId: creatorId,
          id: postId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        (error.code === 'P2025' || error.code === 'P2016')
      ) {
        // Prisma's specific error code for "Record to delete does not exist"
        return Err({ message: 'Post not found' });
      }

      // Handle other unexpected errors
      return Err({ message: 'God knows what happened' });
    }

    return Ok({ postId });
  }
}
