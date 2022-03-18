import { StreamEntity } from './stream.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subject')
export class SubjectEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'History' })
  title: string;

  @ManyToMany(() => StreamEntity, (data) => data.subjects, { eager: true })
  @JoinTable()
  streamIds: StreamEntity[];
}
