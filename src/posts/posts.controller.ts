import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiError, ThrowError } from 'src/utils/errors';
import { Result } from 'ts-results-es';

import CreatePostCommand from './features/create-post/create-post.command';
import { CreatePostRequest } from './features/create-post/create-post.request';
import DeletePostCommand from './features/delete-post/delete-post.command';
import { DeletePostDto } from './features/delete-post/delete-post.dto';
import { DeletePostRequest } from './features/delete-post/delete-post.request';
import EditPostCommand from './features/edit-post/edit-post.command';
import { EditPostRequest } from './features/edit-post/edit-post.request';
import GetPostsCommand from './features/get-posts/get-posts.command';
import { GetPostsRequest } from './features/get-posts/get-posts.request';

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

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Delete(':postId')
  async deletePost(@Param() param: DeletePostRequest, @Request() req) {
    //otypowanie komendy (podpowiedzi z commandBus.execute)
    const res = await this.commandBus.execute<
      DeletePostCommand, //komenda
      Result<DeletePostDto, ApiError> //zwrotka
    >(new DeletePostCommand(req.user.id, param.postId));

    if (res.isOk()) {
      return res.value;
    } else {
      ThrowError(res.error);
    }
  }
}
