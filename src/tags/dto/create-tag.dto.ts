import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  userId: number;
}
