import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsUUID,
  IsArray,
  IsObject,
  IsNumber,
} from 'class-validator';
import {
  CommunityVisibility,
  CommunityType,
} from '../entities/community.entity';

export class CreateCommunityDto {
  @IsString()
  name: string;

  @IsUUID()
  place_id: string;

  @IsOptional()
  @IsBoolean()
  banned?: boolean;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;

  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @IsOptional()
  @IsObject()
  banner_image?: any;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  draft?: boolean;

  @IsOptional()
  @IsBoolean()
  draft_has_about?: boolean;

  @IsOptional()
  @IsBoolean()
  draft_has_location_and_socials?: boolean;

  @IsOptional()
  @IsBoolean()
  draft_has_privacy?: boolean;

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsNumber()
  internal_update_id?: number;

  @IsOptional()
  @IsUUID()
  original_creator_id?: string;

  @IsOptional()
  @IsEnum(CommunityVisibility)
  visibility?: CommunityVisibility;

  @IsOptional()
  @IsBoolean()
  read_only?: boolean;

  @IsOptional()
  @IsObject()
  socials?: any;

  @IsOptional()
  @IsEnum(CommunityType)
  type?: CommunityType;

  @IsOptional()
  @IsObject()
  stats?: any;

  @IsString({
    message: 'firestore-id-required',
  })
  firestore_id: string;

  @IsOptional()
  @IsString()
  domain_name?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  tag_ids?: string[];
}
