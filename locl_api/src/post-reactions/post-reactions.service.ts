import { Injectable } from '@nestjs/common';
import { CreatePostReactionDto } from './dto/create-post-reaction.dto';
import { UpdatePostReactionDto } from './dto/update-post-reaction.dto';

@Injectable()
export class PostReactionsService {
  create(createPostReactionDto: CreatePostReactionDto) {
    return 'This action adds a new postReaction';
  }

  findAll() {
    return `This action returns all postReactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postReaction`;
  }

  update(id: number, updatePostReactionDto: UpdatePostReactionDto) {
    return `This action updates a #${id} postReaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} postReaction`;
  }
}
