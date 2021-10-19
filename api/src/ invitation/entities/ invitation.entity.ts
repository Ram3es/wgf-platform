import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { GroupEntity } from 'src/group/entities/group.entity';

import { INVITATION_STATUS, INVITATION_TYPE } from '../invitation.constants';

@Entity('invitation')
export class InvitationEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id: string;

  @CreateDateColumn()
  @ApiProperty({ example: new Date() })
  inviteDate: Date;

  @Column()
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  from: string;

  @Column()
  @ApiProperty({
    example: 'user@mail.com',
  })
  to: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'User User',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: INVITATION_STATUS,
    default: INVITATION_STATUS.pending,
  })
  @ApiProperty({ example: INVITATION_STATUS.pending })
  status: INVITATION_STATUS;

  @Column({
    type: 'enum',
    enum: INVITATION_TYPE,
  })
  @ApiProperty({ example: INVITATION_TYPE.student })
  type: INVITATION_TYPE;

  @ManyToOne(() => GroupEntity, (data) => data.invitations, {
    onDelete: 'CASCADE',
  })
  group: GroupEntity;
}
