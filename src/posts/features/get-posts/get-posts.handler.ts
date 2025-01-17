import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaProviderService } from 'src/prisma/services/prisma-provider/prisma-provider.service';

import GetPostsCommand from './get-posts.command';
import { GetPostsDto, PostDto } from './get-posts.dto';

@CommandHandler(GetPostsCommand)
export default class GetPostsCommandHandler
  implements ICommandHandler<GetPostsCommand, GetPostsDto>
{
  constructor(private readonly prisma: PrismaProviderService) {}

  async execute(command: GetPostsCommand): Promise<GetPostsDto> {
    const { creatorId, minCreatedAt, maxCreatedAt } = { ...command };
    const posts = (
      await this.prisma.post.findMany({
        where: {
          creatorId: creatorId != null ? creatorId : undefined,
          createdAt: {
            gte: minCreatedAt != null ? new Date(minCreatedAt) : undefined,
            lte: maxCreatedAt != null ? new Date(maxCreatedAt) : undefined,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          creator: true,
        },
      })
    ).map((x): PostDto => {
      return {
        id: x.id,
        creatorId: x.creatorId,
        content: x.content,
        createdAt: x.createdAt,
        tags: x.tags,
        creatorName: `${x.creator.name} ${x.creator.surname}`,
      };
    });
    return new GetPostsDto(posts);
  }
}
