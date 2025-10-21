import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async create(createCommunityDto: CreateCommunityDto): Promise<Community> {
    const community = this.communityRepository.create(createCommunityDto);
    return await this.communityRepository.save(community);
  }

  async findAll(): Promise<Community[]> {
    return await this.communityRepository.find({
      relations: ['place', 'original_creator'], // Load related data
    });
  }

  async findOne(id: string): Promise<Community> {
    const community = await this.communityRepository.findOne({
      where: { id },
    });
    if (!community) {
      throw new NotFoundException(`Community with ID ${id} not found`);
    }
    return community;
  }

  async update(
    id: string,
    updateCommunityDto: UpdateCommunityDto,
  ): Promise<Community> {
    const community = await this.findOne(id);
    Object.assign(community, updateCommunityDto);
    return await this.communityRepository.save(community);
  }

  async remove(id: string): Promise<void> {
    const community = await this.findOne(id);
    await this.communityRepository.remove(community);
  }
}
