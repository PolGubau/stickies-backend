import { ApiProperty } from '@nestjs/swagger';
import { Sticky } from '@prisma/client';

export class StickyEntity implements Sticky {
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

  @ApiProperty()
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
