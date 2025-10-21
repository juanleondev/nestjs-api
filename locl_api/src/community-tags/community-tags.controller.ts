import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunityTagsService } from './community-tags.service';
import { CreateCommunityTagDto } from './dto/create-community-tag.dto';
import { UpdateCommunityTagDto } from './dto/update-community-tag.dto';

@Controller('community-tags')
export class CommunityTagsController {
  constructor(private readonly communityTagsService: CommunityTagsService) {}

  @Post()
  create(@Body() createCommunityTagDto: CreateCommunityTagDto) {
    return this.communityTagsService.create(createCommunityTagDto);
  }

  @Get()
  findAll() {
    return this.communityTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communityTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunityTagDto: UpdateCommunityTagDto) {
    return this.communityTagsService.update(+id, updateCommunityTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communityTagsService.remove(+id);
  }
}
