import { Module } from '@nestjs/common';
import { PostCommentLikesService } from './post-comment-likes.service';
import { PostCommentLikesController } from './post-comment-likes.controller';

@Module({
  controllers: [PostCommentLikesController],
  providers: [PostCommentLikesService],
})
export class PostCommentLikesModule {}
