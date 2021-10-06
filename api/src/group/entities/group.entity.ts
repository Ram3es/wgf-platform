import {
    Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { InvitationEntity } from 'src/ invitation/entities/ invitation.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('group')
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @CreateDateColumn()
  @ApiProperty({ example: new Date() })
  created: Date;

  @Column()
  @ApiProperty({ example: 'Group 1' })
  name: string;

  @Column()
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  trainerId: string;

  @ManyToMany(() => UserEntity, (data) => data.groups, { eager: true })
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => InvitationEntity, (data) => data.group)
  invitations: InvitationEntity[];
}
