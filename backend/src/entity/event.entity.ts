import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('date')
  startHour: Date;

  @Column('date')
  endHour: Date;
}
