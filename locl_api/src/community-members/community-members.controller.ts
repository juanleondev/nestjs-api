import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunityMembersService } from './community-members.service';
import { CreateCommunityMemberDto } from './dto/create-community-member.dto';
import { UpdateCommunityMemberDto } from './dto/update-community-member.dto';

@Controller('community-members')
export class CommunityMembersController {
  constructor(private readonly communityMembersService: CommunityMembersService) {}

  @Post()
  create(@Body() createCommunityMemberDto: CreateCommunityMemberDto) {
    return this.communityMembersService.create(createCommunityMemberDto);
  }

  @Get()
  findAll() {
    return this.communityMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communityMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunityMemberDto: UpdateCommunityMemberDto) {
    return this.communityMembersService.update(+id, updateCommunityMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communityMembersService.remove(+id);
  }
}
