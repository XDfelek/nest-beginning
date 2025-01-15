import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Query,
  Get,
  Put,
} from '@nestjs/common';
import CreatePostCommand from './features/create-post/create-post.command';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostRequest } from './features/create-post/create-post.request';
import { GetPostsRequest } from './features/get-posts/get-posts.request';
import GetPostsCommand from './features/get-posts/get-posts.command';
import { EditPostRequest } from './features/edit-post/edit-post.request';
import EditPostCommand from './features/edit-post/edit-post.command';

@Controller('posts')
export class PostsController {
  constructor(private commandBus: CommandBus) {}

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Post()
  async createPost(@Body() body: CreatePostRequest, @Request() req) {
    const res = await this.commandBus.execute(
      new CreatePostCommand(body.content, body.tags, req.user.id),
    );

    if (res.isOk()) {
      return res.value;
    } else {
      throw new BadRequestException(res.error);
    }
  }

  @Get()
  async getPosts(@Query() query: GetPostsRequest) {
    const res = await this.commandBus.execute(
      new GetPostsCommand(
        query.creatorId,
        query.minCreatedAt,
        query.maxCreatedAt,
      ),
    );
    return res;
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Put()
  async editPost(@Body() body: EditPostRequest, @Request() req) {
    const res = await this.commandBus.execute(
      new EditPostCommand(req.user.id, body.postId, body.content, body.tags),
    );

    if (res.isOk()) {
      return res.value;
    } else {
      throw new BadRequestException(res.error);
    }
  }
}
