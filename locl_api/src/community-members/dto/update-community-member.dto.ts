import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunityMemberDto } from './create-community-member.dto';

export class UpdateCommunityMemberDto extends PartialType(
  CreateCommunityMemberDto,
) {}
