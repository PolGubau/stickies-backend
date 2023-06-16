import { ApiProperty } from '@nestjs/swagger';

export class CreateStickyDto {
  @ApiProperty()
  title: string;

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
}
