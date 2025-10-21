import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('community_tags')
export class CommunityTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @CreateDateColumn({ 
    type: 'timestamp with time zone',
    nullable: true,
    default: () => 'now()'
  })
  created_at: Date;

  @Column({ type: 'uuid', nullable: true })
  creator_id: string;

  @Column({ type: 'boolean', default: false })
  disabled: boolean;

  // Foreign key relationships
  @ManyToOne(() => User, user => user.created_tags)
  @JoinColumn({ name: 'creator_id' })
  creator: User;
}
