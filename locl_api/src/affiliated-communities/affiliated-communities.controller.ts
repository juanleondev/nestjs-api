import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AffiliatedCommunitiesService } from './affiliated-communities.service';
import { CreateAffiliatedCommunityDto } from './dto/create-affiliated-community.dto';
import { UpdateAffiliatedCommunityDto } from './dto/update-affiliated-community.dto';

@Controller('affiliated-communities')
export class AffiliatedCommunitiesController {
  constructor(private readonly affiliatedCommunitiesService: AffiliatedCommunitiesService) {}

  @Post()
  create(@Body() createAffiliatedCommunityDto: CreateAffiliatedCommunityDto) {
    return this.affiliatedCommunitiesService.create(createAffiliatedCommunityDto);
  }

  @Get()
  findAll() {
    return this.affiliatedCommunitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliatedCommunitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAffiliatedCommunityDto: UpdateAffiliatedCommunityDto) {
    return this.affiliatedCommunitiesService.update(+id, updateAffiliatedCommunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliatedCommunitiesService.remove(+id);
  }
}
