import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostReactionsService } from './post-reactions.service';
import { CreatePostReactionDto } from './dto/create-post-reaction.dto';
import { UpdatePostReactionDto } from './dto/update-post-reaction.dto';

@Controller('post-reactions')
export class PostReactionsController {
  constructor(private readonly postReactionsService: PostReactionsService) {}

  @Post()
  create(@Body() createPostReactionDto: CreatePostReactionDto) {
    return this.postReactionsService.create(createPostReactionDto);
  }

  @Get()
  findAll() {
    return this.postReactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postReactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostReactionDto: UpdatePostReactionDto,
  ) {
    return this.postReactionsService.update(+id, updatePostReactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postReactionsService.remove(+id);
  }
}
