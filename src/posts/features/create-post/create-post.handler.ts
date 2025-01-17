import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaProviderService } from 'src/prisma/services/prisma-provider/prisma-provider.service';
import { BaseError } from 'src/utils/errors';
import { Ok, Result } from 'ts-results-es';

import CreatePostCommand from './create-post.command';
import { CreatePostDto } from './create-post.dto';

@CommandHandler(CreatePostCommand)
export default class CreatePostCommandHandler
  implements
    ICommandHandler<CreatePostCommand, Result<CreatePostDto, BaseError>>
{
  constructor(private readonly prisma: PrismaProviderService) {}

  async execute(
    command: CreatePostCommand,
  ): Promise<Result<CreatePostDto, BaseError>> {
    const createdPost = await this.prisma.post.create({
      data: {
        content: command.content,
        tags: command.tags.split(',').map((x) => x.trim()),
        creatorId: command.userId,
        createdAt: new Date(),
      },
    });
    return new Ok({ id: createdPost.id });
  }
}

// "#tag1, #tag2, #tag3" -- request
// ["#tag1", "#tag2", '#tag3'] -- baza
