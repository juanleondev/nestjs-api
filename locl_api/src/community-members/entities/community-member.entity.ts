import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Community } from '../../communities/entities/community.entity';

export enum CommunityMemberRole {
  MEMBER = 'MEMBER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER'
}

@Entity('community_members')
export class CommunityMember {
  @PrimaryColumn({ type: 'uuid' })
  user_id: string;

  @PrimaryColumn({ type: 'uuid' })
  community_id: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  banned: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  disabled: boolean;

  @Column({ 
    type: 'timestamp with time zone',
    nullable: true,
    default: () => 'now()'
  })
  joined_at: Date;

  @Column({ type: 'bigint' })
  internal_update_seen_id: number;

  @Column({ type: 'boolean', default: false })
  is_pinned: boolean;

  @Column({ 
    type: 'enum',
    enum: CommunityMemberRole,
    default: CommunityMemberRole.MEMBER
  })
  role: CommunityMemberRole;

  @Column({ type: 'boolean', default: false })
  hide_membership_from_non_members: boolean;

  // Foreign key relationships
  @ManyToOne(() => User, user => user.community_memberships)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Community, community => community.members)
  @JoinColumn({ name: 'community_id' })
  community: Community;
}
