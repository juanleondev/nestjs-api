import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Community } from '../../communities/entities/community.entity';
import { User } from '../../users/entities/user.entity';

export enum AffiliationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

@Entity('affiliated_communities')
export class AffiliatedCommunity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  requester_community_id: string;

  @Column({ type: 'uuid' })
  target_community_id: string;

  @Column({ type: 'uuid' })
  requester_user_id: string;

  @Column({
    type: 'enum',
    enum: AffiliationStatus,
    default: AffiliationStatus.PENDING,
  })
  status: AffiliationStatus;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'now()',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'now()',
  })
  updated_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  accepted_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  rejected_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  cancelled_at: Date;

  @Column({ type: 'text', nullable: true })
  message: string;

  // Foreign key relationships
  @ManyToOne(() => Community, (community) => community.requested_affiliations)
  @JoinColumn({ name: 'requester_community_id' })
  requester_community: Community;

  @ManyToOne(() => Community, (community) => community.received_affiliations)
  @JoinColumn({ name: 'target_community_id' })
  target_community: Community;

  @ManyToOne(() => User, (user) => user.requested_affiliations)
  @JoinColumn({ name: 'requester_user_id' })
  requester_user: User;
}
