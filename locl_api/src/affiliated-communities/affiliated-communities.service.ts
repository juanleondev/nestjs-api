import { Injectable } from '@nestjs/common';
import { CreateAffiliatedCommunityDto } from './dto/create-affiliated-community.dto';
import { UpdateAffiliatedCommunityDto } from './dto/update-affiliated-community.dto';

@Injectable()
export class AffiliatedCommunitiesService {
  create(createAffiliatedCommunityDto: CreateAffiliatedCommunityDto) {
    return 'This action adds a new affiliatedCommunity';
  }

  findAll() {
    return `This action returns all affiliatedCommunities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} affiliatedCommunity`;
  }

  update(
    id: number,
    updateAffiliatedCommunityDto: UpdateAffiliatedCommunityDto,
  ) {
    return `This action updates a #${id} affiliatedCommunity`;
  }

  remove(id: number) {
    return `This action removes a #${id} affiliatedCommunity`;
  }
}
