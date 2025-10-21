import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Community } from '../../communities/entities/community.entity';
import { PostComment } from '../../post-comments/entities/post-comment.entity';
import { PostReaction } from '../../post-reactions/entities/post-reaction.entity';

export enum PostType {
  UNKNOWN_POST_TYPE = 'UNKNOWN_POST_TYPE',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  LINK = 'LINK',
  POLL = 'POLL',
  EVENT = 'EVENT',
  ANNOUNCEMENT = 'ANNOUNCEMENT'
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  community_id: string;

  @Column({ 
    type: 'enum',
    enum: PostType,
    default: PostType.TEXT
  })
  post_type: PostType;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text', array: true, nullable: true })
  media_urls: string[];

  @CreateDateColumn({ 
    type: 'timestamp with time zone',
    nullable: true,
    default: () => 'now()'
  })
  created_at: Date;

  @UpdateDateColumn({ 
    type: 'timestamp with time zone',
    nullable: true,
    default: () => 'now()'
  })
  updated_at: Date;

  @Column({ type: 'boolean', nullable: true, default: false })
  deleted: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  disabled: boolean;

  @Column({ type: 'jsonb', nullable: true })
  post_stats: any;

  @Column({ type: 'jsonb', nullable: true })
  media_url_optimized: any;

  @Column({ type: 'text', array: true, nullable: true })
  media_url_paths: string[];

  @Column({ type: 'jsonb', nullable: true })
  gif_media: any;

  @Column({ type: 'boolean', nullable: true, default: false })
  edited: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_pinned: boolean;

  @Column({ type: 'jsonb', nullable: true })
  video_media: any;

  @Column({ type: 'text', array: true, nullable: true })
  media_list: string[];

  @Column({ type: 'text', array: true, nullable: true })
  links: string[];

  @Column({ type: 'smallint', nullable: true })
  seen_id: number;

  @Column({ type: 'text', array: true, nullable: true })
  reactions_stats: string[];

  @Column({ type: 'varchar' })
  firestore_id: string;

  @Column({ type: 'uuid', nullable: true })
  parent_id: string;

  @Column({ type: 'text', array: true, nullable: true })
  thread_path: string[];

  @Column({ type: 'integer', nullable: true })
  thread_level: number;

  @Column({ type: 'uuid', nullable: true })
  root_post_id: string;

  @Column({ type: 'text', array: true, nullable: true })
  tags: string[];

  // Foreign key relationships
  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Community, community => community.posts)
  @JoinColumn({ name: 'community_id' })
  community: Community;

  @ManyToOne(() => Post, post => post.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Post;

  @ManyToOne(() => Post, post => post.root, { nullable: true })
  @JoinColumn({ name: 'root_post_id' })
  root: Post;

  // One-to-many relationships
  @OneToMany(() => Post, post => post.parent)
  replies: Post[];

  @OneToMany(() => PostComment, comment => comment.post)
  comments: PostComment[];

  @OneToMany(() => PostReaction, reaction => reaction.post)
  reactions: PostReaction[];
}
