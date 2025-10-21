import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ConnectionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  BLOCKED = 'BLOCKED'
}

@Entity('connections')
export class Connection {
  @PrimaryColumn({ type: 'uuid' })
  accepter_id: string;

  @PrimaryColumn({ type: 'uuid' })
  inviter_id: string;

  @Column({ 
    type: 'enum',
    enum: ConnectionStatus,
    default: ConnectionStatus.PENDING
  })
  status: ConnectionStatus;

  @CreateDateColumn({ 
    type: 'timestamp with time zone',
    default: () => 'now()'
  })
  created_at: Date;

  @UpdateDateColumn({ 
    type: 'timestamp with time zone',
    default: () => 'now()'
  })
  updated_at: Date;

  // Foreign key relationships
  @ManyToOne(() => User, user => user.received_connections)
  @JoinColumn({ name: 'accepter_id' })
  accepter: User;

  @ManyToOne(() => User, user => user.sent_connections)
  @JoinColumn({ name: 'inviter_id' })
  inviter: User;
}
