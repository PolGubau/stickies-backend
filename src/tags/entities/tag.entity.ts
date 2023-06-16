import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@prisma/client';

export class TagEntity implements Tag {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  description: string;
  @ApiProperty()
  userId: number;
}
