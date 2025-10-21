import { Injectable } from '@nestjs/common';
import { CreatePostCommentLikeDto } from './dto/create-post-comment-like.dto';
import { UpdatePostCommentLikeDto } from './dto/update-post-comment-like.dto';

@Injectable()
export class PostCommentLikesService {
  create(createPostCommentLikeDto: CreatePostCommentLikeDto) {
    return 'This action adds a new postCommentLike';
  }

  findAll() {
    return `This action returns all postCommentLikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postCommentLike`;
  }

  update(id: number, updatePostCommentLikeDto: UpdatePostCommentLikeDto) {
    return `This action updates a #${id} postCommentLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} postCommentLike`;
  }
}
