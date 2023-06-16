import { ApiProperty } from '@nestjs/swagger';
import { Sticky } from '@prisma/client';

export class StickiesEntity implements Sticky {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  content: string;

  @ApiProperty()
  priority: number;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty({
    description: 'If true, only the user can see the sticky',
    default: false,
  })
  isPrivate: boolean;

  @ApiProperty()
  isDone: boolean;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  updatedAt: Date;
}
