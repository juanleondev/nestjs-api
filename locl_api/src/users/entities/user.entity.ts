import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
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
  HIDDEN = 'hidden',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: true })
  profile_image: any;

  @Column({ type: 'text' })
  first_name: string;

  @Column({ type: 'text' })
  last_name: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: () => 'now()',
  })
  created_at: Date;

  @Column({ type: 'varchar', length: 128, nullable: true })
  auth_uid: string;

  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'boolean', default: false })
  disabled: boolean;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'now()',
  })
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
  about_text: string;

  @Column({ type: 'jsonb', nullable: true })
  banner_image: any;

  @Column({
    type: 'enum',
    enum: UserVisibility,
    default: UserVisibility.PUBLIC,
  })
  visibility: UserVisibility;

  @Column({ type: 'varchar', nullable: true })
  short_bio: string;

  @Column({ type: 'boolean', default: true })
  activity_tab_public_enabled: boolean;

  // Relationships
  @OneToMany(() => Community, (community) => community.original_creator)
  created_communities: Community[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => PostComment, (comment) => comment.user)
  comments: PostComment[];

  @OneToMany(() => CommunityMember, (member) => member.user)
  community_memberships: CommunityMember[];

  @OneToMany(() => Connection, (connection) => connection.inviter)
  sent_connections: Connection[];

  @OneToMany(() => Connection, (connection) => connection.accepter)
  received_connections: Connection[];

  @OneToMany(
    () => AffiliatedCommunity,
    (affiliation) => affiliation.requester_user,
  )
  requested_affiliations: AffiliatedCommunity[];

  @OneToMany(() => PostReaction, (reaction) => reaction.user)
  post_reactions: PostReaction[];

  @OneToMany(() => PostCommentLike, (like) => like.user)
  comment_likes: PostCommentLike[];

  @OneToMany(() => CommunityTag, (tag) => tag.creator)
  created_tags: CommunityTag[];
}
