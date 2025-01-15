import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import EditPostCommand from './edit-post.command';
import { Err, Ok, Result } from 'ts-results-es';
import { EditPostDto } from './edit-post.dto';
import { PrismaProviderService } from 'src/prisma/services/prisma-provider/prisma-provider.service';

@CommandHandler(EditPostCommand)
export default class EditPostCommandHandler
  implements ICommandHandler<EditPostCommand, Result<EditPostDto, BaseError>>
{
  constructor(private readonly prisma: PrismaProviderService) {}

  async execute(
    command: EditPostCommand,
  ): Promise<Result<EditPostDto, BaseError>> {
    const { creatorId, postId, content, tags } = { ...command };

    if (content == null && tags == null) {
      return Err({ message: 'no changes were provided' });
    }
    const data: any = {
      updatedAt: new Date(),
    };
    if (content != null) {
      data.content = content;
    }
    if (tags != null) {
      data.tags = tags.split(',').map((x) => x.trim());
    }
    const editedPost = await this.prisma.post.update({
      where: {
        creatorId: creatorId,
        id: postId,
      },
      data,
    });

    return new Ok({ postId: editedPost.id });
  }
}
