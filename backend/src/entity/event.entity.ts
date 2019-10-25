import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  startHour: string;

  @Column('text')
  endHour: string;

  @Column('date')
  begin: Date;

  @Column('date')
  end?: Date;

  @ManyToOne(type => UserEntity, user => user.events)
  owner: UserEntity;
}
