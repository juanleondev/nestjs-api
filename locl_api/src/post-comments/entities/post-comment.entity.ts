import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';
import { Community } from '../../communities/entities/community.entity';
import { PostCommentLike } from '../../post-comment-likes/entities/post-comment-like.entity';

@Entity('post_comments')
export class PostComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  post_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  community_id: string;

  @Column({ type: 'text', nullable: true })
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

  @Column({ type: 'text', array: true, nullable: true })
  media_url_paths: string[];

  @Column({ type: 'jsonb', nullable: true })
  post_comment_stats: any;

  @Column({ type: 'boolean', nullable: true, default: false })
  edited: boolean;

  @Column({ type: 'varchar' })
  firestore_id: string;

  // Foreign key relationships
  @ManyToOne(() => Post, post => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Community, community => community.posts)
  @JoinColumn({ name: 'community_id' })
  community: Community;

  // One-to-many relationships
  @OneToMany(() => PostCommentLike, like => like.post_comment)
  likes: PostCommentLike[];
}
