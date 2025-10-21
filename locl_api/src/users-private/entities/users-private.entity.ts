import { Entity, PrimaryColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Place } from '../../places/entities/place.entity';

@Entity('users_private')
export class UsersPrivate {
  @PrimaryColumn({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  place_id: string;

  @Column({ type: 'boolean', default: false })
  agree_terms_v1: boolean;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'boolean', default: false })
  email_verified: boolean;

  @Column({ type: 'jsonb', nullable: true })
  fcm_tokens: any;

  @Column({ type: 'jsonb', nullable: true })
  notification_settings: any;

  @Column({ type: 'boolean', default: false })
  phone_verified: boolean;

  @UpdateDateColumn({ 
    type: 'timestamp with time zone',
    default: () => 'now()'
  })
  updated_at: Date;

  // Foreign key relationships
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Place, { nullable: true })
  @JoinColumn({ name: 'place_id' })
  place: Place;
}
