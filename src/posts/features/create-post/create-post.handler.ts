import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import CreatePostCommand from './create-post.command';
import { CreatePostDto } from './create-post.dto';
import { Err, Ok, Result } from 'ts-results-es';
import { PrismaProviderService } from 'src/prisma/services/prisma-provider/prisma-provider.service';

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
