import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostCommentLikesService } from './post-comment-likes.service';
import { CreatePostCommentLikeDto } from './dto/create-post-comment-like.dto';
import { UpdatePostCommentLikeDto } from './dto/update-post-comment-like.dto';

@Controller('post-comment-likes')
export class PostCommentLikesController {
  constructor(private readonly postCommentLikesService: PostCommentLikesService) {}

  @Post()
  create(@Body() createPostCommentLikeDto: CreatePostCommentLikeDto) {
    return this.postCommentLikesService.create(createPostCommentLikeDto);
  }

  @Get()
  findAll() {
    return this.postCommentLikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postCommentLikesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostCommentLikeDto: UpdatePostCommentLikeDto) {
    return this.postCommentLikesService.update(+id, updatePostCommentLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postCommentLikesService.remove(+id);
  }
}
