import { SubjectEntity } from './subject.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stream')
export class StreamEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'CWOM' })
  stream: string;

  @Column()
  @ApiProperty({ example: ' CWOM: Commerce without Math' })
  description: string;

  @ManyToMany(() => SubjectEntity, (data) => data.streamIds)
  subjects: SubjectEntity[];
}
