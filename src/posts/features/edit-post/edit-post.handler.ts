import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaProviderService } from 'src/prisma/services/prisma-provider/prisma-provider.service';
import { BaseError } from 'src/utils/errors';
import { Err, Ok, Result } from 'ts-results-es';

import EditPostCommand from './edit-post.command';
import { EditPostDto } from './edit-post.dto';

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
    // const data: any = {
    //   updatedAt: new Date(),
    // };
    // if (content != null) {
    //   data.content = content;
    // }
    // if (tags != null) {
    //   data.tags = tags.split(',').map((x) => x.trim());
    // }
    const editedPost = await this.prisma.post.update({
      where: {
        creatorId: creatorId,
        id: postId,
      },
      data: {
        content: content ? content : undefined,
        tags: tags ? tags.split(',').map((x) => x.trim()) : undefined,
      },
    });

    return new Ok({ postId: editedPost.id });
  }
}
