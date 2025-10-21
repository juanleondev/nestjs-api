import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunityDto } from './create-community.dto';

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {
  // All fields from CreateCommunityDto are now optional
  // You can add specific validation rules here if needed
}
