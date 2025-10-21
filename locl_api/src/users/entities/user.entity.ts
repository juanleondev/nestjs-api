import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Community } from '../../communities/entities/community.entity';
import { Post } from '../../posts/entities/post.entity';
import { PostComment } from '../../post-comments/entities/post-comment.entity';
import { CommunityMember } from '../../community-members/entities/community-member.entity';
import { Connection } from '../../connections/entities/connection.entity';
import { AffiliatedCommunity } from '../../affiliated-communities/entities/affiliated-community.entity';
import { PostReaction } from '../../post-reactions/entities/post-reaction.entity';
import { PostCommentLike } from '../../post-comment-likes/entities/post-comment-like.entity';
import { CommunityTag } from '../../community-tags/entities/community-tag.entity';

export enum UserVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  HIDDEN = 'hidden'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  instance_id: string;

  @Column({ type: 'jsonb', nullable: true })
  profile_image: any;

  @Column({ type: 'text' })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  aud: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  role: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @CreateDateColumn({ 
    type: 'timestamp with time zone',
    nullable: true,
    default: () => 'now()'
  })
  created_at: Date;

  @Column({ type: 'varchar', length: 128, nullable: true })
  auth_uid: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  encrypted_password: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  email_confirmed_at: Date;

  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  invited_at: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'boolean', default: false })
  disabled: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  confirmation_token: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  confirmation_sent_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recovery_token: string;

  @UpdateDateColumn({ 
    type: 'timestamp with time zone',
    default: () => 'now()'
  })
  updated_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  recovery_sent_at: Date;

  @Column({ type: 'text', nullable: true })
  about_text: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email_change_token_new: string;

  @Column({ type: 'jsonb', nullable: true })
  banner_image: any;

  @Column({ 
    type: 'enum',
    enum: UserVisibility,
    default: UserVisibility.PUBLIC
  })
  visibility: UserVisibility;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email_change: string;

  @Column({ type: 'varchar', nullable: true })
  short_bio: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  email_change_sent_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  last_sign_in_at: Date;

  @Column({ type: 'boolean', default: false })
  activity_tab_public_enabled: boolean;

  @Column({ type: 'jsonb', nullable: true })
  raw_app_meta_data: any;

  @Column({ type: 'jsonb', nullable: true })
  raw_user_meta_data: any;

  @Column({ type: 'boolean', nullable: true })
  is_super_admin: boolean;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  phone_confirmed_at: Date;

  @Column({ type: 'text', nullable: true })
  phone_change: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone_change_token: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  phone_change_sent_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  confirmed_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email_change_token_current: string;

  @Column({ type: 'smallint', nullable: true })
  email_change_confirm_status: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  banned_until: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reauthentication_token: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  reauthentication_sent_at: Date;

  @Column({ type: 'boolean', default: false })
  is_sso_user: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deleted_at: Date;

  @Column({ type: 'boolean', default: false })
  is_anonymous: boolean;

  // Relationships
  @OneToMany(() => Community, community => community.original_creator)
  created_communities: Community[];

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => PostComment, comment => comment.user)
  comments: PostComment[];

  @OneToMany(() => CommunityMember, member => member.user)
  community_memberships: CommunityMember[];

  @OneToMany(() => Connection, connection => connection.inviter)
  sent_connections: Connection[];

  @OneToMany(() => Connection, connection => connection.accepter)
  received_connections: Connection[];

  @OneToMany(() => AffiliatedCommunity, affiliation => affiliation.requester_user)
  requested_affiliations: AffiliatedCommunity[];

  @OneToMany(() => PostReaction, reaction => reaction.user)
  post_reactions: PostReaction[];

  @OneToMany(() => PostCommentLike, like => like.user)
  comment_likes: PostCommentLike[];

  @OneToMany(() => CommunityTag, tag => tag.creator)
  created_tags: CommunityTag[];
}
