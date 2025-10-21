import { PartialType } from '@nestjs/mapped-types';
import { CreateAffiliatedCommunityDto } from './create-affiliated-community.dto';

export class UpdateAffiliatedCommunityDto extends PartialType(CreateAffiliatedCommunityDto) {}
