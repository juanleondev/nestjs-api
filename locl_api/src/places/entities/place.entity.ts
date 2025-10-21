import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Community } from '../../communities/entities/community.entity';

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326
  })
  geopoint: any; // PostGIS Point type

  @CreateDateColumn({ 
    type: 'timestamp with time zone',
    nullable: true,
    default: () => 'now()'
  })
  created_at: Date;

  @Column({ type: 'varchar' })
  iso_country_code: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  firestore_id: string;

  // Relationships
  @OneToMany(() => Community, community => community.place)
  communities: Community[];
}
