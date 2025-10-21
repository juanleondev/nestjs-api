import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { Emoji } from '../../emojis/entities/emoji.entity';

@Entity('post_reactions')
export class PostReaction {
  @PrimaryColumn({ type: 'uuid' })
  user_id: string;

  @PrimaryColumn({ type: 'uuid' })
  post_id: string;

  @PrimaryColumn({ type: 'uuid' })
  emoji_id: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: () => 'now()',
  })
  created_at: Date;

  // Foreign key relationships
  @ManyToOne(() => User, (user) => user.post_reactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.reactions)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => Emoji, (emoji) => emoji.reactions)
  @JoinColumn({ name: 'emoji_id' })
  emoji: Emoji;
}
