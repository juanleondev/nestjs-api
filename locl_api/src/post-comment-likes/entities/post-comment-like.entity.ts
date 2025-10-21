import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PostComment } from '../../post-comments/entities/post-comment.entity';

@Entity('post_comment_likes')
export class PostCommentLike {
  @PrimaryColumn({ type: 'uuid' })
  user_id: string;

  @PrimaryColumn({ type: 'uuid' })
  post_comment_id: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'now()',
  })
  created_at: Date;

  // Foreign key relationships
  @ManyToOne(() => User, (user) => user.comment_likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PostComment, (comment) => comment.likes)
  @JoinColumn({ name: 'post_comment_id' })
  post_comment: PostComment;
}
