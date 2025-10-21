import { Injectable } from '@nestjs/common';
import { CreateCommunityTagDto } from './dto/create-community-tag.dto';
import { UpdateCommunityTagDto } from './dto/update-community-tag.dto';

@Injectable()
export class CommunityTagsService {
  create(createCommunityTagDto: CreateCommunityTagDto) {
    return 'This action adds a new communityTag';
  }

  findAll() {
    return `This action returns all communityTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} communityTag`;
  }

  update(id: number, updateCommunityTagDto: UpdateCommunityTagDto) {
    return `This action updates a #${id} communityTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} communityTag`;
  }
}
