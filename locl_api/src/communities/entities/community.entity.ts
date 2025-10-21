import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Place } from '../../places/entities/place.entity';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { CommunityMember } from '../../community-members/entities/community-member.entity';
import { AffiliatedCommunity } from '../../affiliated-communities/entities/affiliated-community.entity';

export enum CommunityVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  HIDDEN = 'hidden',
}

export enum CommunityType {
  UNKNOWN_COMMUNITY_TYPE = 'UNKNOWN_COMMUNITY_TYPE',
  HEALTH_AND_WELLNESS = 'HEALTH_AND_WELLNESS',
  FOOD_AND_DRINK = 'FOOD_AND_DRINK',
  BUSINESS_AND_NETWORKING = 'BUSINESS_AND_NETWORKING',
  NON_PROFIT = 'NON_PROFIT',
  CREATIVE = 'CREATIVE',
  CLUBS_AND_GATHERINGS = 'CLUBS_AND_GATHERINGS',
  TECHNOLOGY_AND_DESIGN = 'TECHNOLOGY_AND_DESIGN',
  FAMILY_AND_PARENTING = 'FAMILY_AND_PARENTING',
  ADVOCACY = 'ADVOCACY',
  SPORTS_AND_RECREATION = 'SPORTS_AND_RECREATION',
  FAITH_AND_SPIRITUALITY = 'FAITH_AND_SPIRITUALITY',
  NEIGHBORHOODS = 'NEIGHBORHOODS',
  EDUCATION_AND_LEARNING = 'EDUCATION_AND_LEARNING',
  ENTERTAINMENT = 'ENTERTAINMENT',
  HOBBIES_AND_INTERESTS = 'HOBBIES_AND_INTERESTS',
  POLITICS_AND_CIVICS = 'POLITICS_AND_CIVICS',
}

@Entity('communities')
export class Community {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'uuid' })
  place_id: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  banned: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  disabled: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: () => 'now()',
  })
  created_at: Date;

  @Column({ type: 'jsonb', nullable: true })
  banner_image: any;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  draft: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  draft_has_about: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  draft_has_location_and_socials: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  draft_has_privacy: boolean;

  @Column({ type: 'text', nullable: true })
  headline: string;

  @Column({ type: 'smallint', nullable: true, default: 0 })
  internal_update_id: number;

  @Column({ type: 'uuid', nullable: true })
  original_creator_id: string;

  @Column({
    type: 'enum',
    enum: CommunityVisibility,
    default: CommunityVisibility.PUBLIC,
  })
  visibility: CommunityVisibility;

  @Column({ type: 'boolean', default: false })
  read_only: boolean;

  @Column({ type: 'jsonb', nullable: true })
  socials: any;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => "now() AT TIME ZONE 'utc'",
  })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: CommunityType,
    default: CommunityType.UNKNOWN_COMMUNITY_TYPE,
  })
  type: CommunityType;

  @Column({ type: 'jsonb', nullable: true })
  stats: any;

  @Column({ type: 'varchar', unique: true })
  firestore_id: string;

  @Column({ type: 'text', nullable: true })
  domain_name: string;

  @Column({ type: 'uuid', array: true, nullable: true, default: '{}' })
  tag_ids: string[];

  // Foreign key relationships
  @ManyToOne(() => Place, { nullable: true })
  @JoinColumn({ name: 'place_id' })
  place?: Place; // Optional because it might not be loaded

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'original_creator_id' })
  original_creator: User;

  // One-to-many relationships
  @OneToMany(() => Post, (post) => post.community)
  posts: Post[];

  @OneToMany(() => CommunityMember, (member) => member.community)
  members: CommunityMember[];

  @OneToMany(
    () => AffiliatedCommunity,
    (affiliation) => affiliation.requester_community,
  )
  requested_affiliations: AffiliatedCommunity[];

  @OneToMany(
    () => AffiliatedCommunity,
    (affiliation) => affiliation.target_community,
  )
  received_affiliations: AffiliatedCommunity[];
}
