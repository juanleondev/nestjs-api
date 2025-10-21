import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PostReaction } from '../../post-reactions/entities/post-reaction.entity';

@Entity('emojis')
export class Emoji {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  unicode: string;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @Column({ type: 'text', array: true, nullable: true })
  keywords: string[];

  @Column({ type: 'text', nullable: true })
  category: string;

  @Column({ type: 'text' })
  firestore_id: string;

  // One-to-many relationships
  @OneToMany(() => PostReaction, (reaction) => reaction.emoji)
  reactions: PostReaction[];
}
