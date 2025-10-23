import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Or, FindOptionsWhere } from 'typeorm';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
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

  async findAll(paginationDto?: PaginationDto): Promise<PaginatedResponseDto<Community>> {
    const { limit = 10, offset = 0, search } = paginationDto || {};
    
    // Build search conditions if search query is provided
    const whereConditions: FindOptionsWhere<Community>[] | undefined = search
      ? [
          { name: Like(`%${search}%`) },
          { description: Like(`%${search}%`) },
          { headline: Like(`%${search}%`) },
          { domain_name: Like(`%${search}%`) },
        ]
      : undefined;

    const [communities, total] = await this.communityRepository.findAndCount({
      relations: ['place', 'original_creator'], // Load related data
      where: whereConditions,
      take: limit,
      skip: offset,
      order: { created_at: 'DESC' }, // Order by creation date, newest first
    });

    return new PaginatedResponseDto(communities, total, limit, offset);
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
