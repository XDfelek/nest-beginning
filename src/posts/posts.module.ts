import { Delete, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { CqrsModule } from '@nestjs/cqrs';
import CreatePostCommandHandler from './features/create-post/create-post.handler';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import GetPostsCommandHandler from './features/get-posts/get-posts.handler';
import EditPostCommand from './features/edit-post/edit-post.command';
import EditPostCommandHandler from './features/edit-post/edit-post.handler';
import DeletePostCommandHandler from './features/delete-post/delete-post.handler';

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
