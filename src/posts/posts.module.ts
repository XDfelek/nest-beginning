import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import CreatePostCommandHandler from './features/create-post/create-post.handler';
import DeletePostCommandHandler from './features/delete-post/delete-post.handler';
import EditPostCommandHandler from './features/edit-post/edit-post.handler';
import GetPostsCommandHandler from './features/get-posts/get-posts.handler';
import { PostsController } from './posts.controller';

export const CommandHandlers = [
  CreatePostCommandHandler,
  GetPostsCommandHandler,
  EditPostCommandHandler,
  DeletePostCommandHandler,
];

@Module({
  controllers: [PostsController],
  imports: [CqrsModule, PrismaModule, AuthModule],
  providers: [...CommandHandlers],
})
export class PostsModule {}
