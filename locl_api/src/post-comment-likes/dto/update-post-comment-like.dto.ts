import { PartialType } from '@nestjs/mapped-types';
import { CreatePostCommentLikeDto } from './create-post-comment-like.dto';

export class UpdatePostCommentLikeDto extends PartialType(
  CreatePostCommentLikeDto,
) {}
