import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunityTagDto } from './create-community-tag.dto';

export class UpdateCommunityTagDto extends PartialType(CreateCommunityTagDto) {}
