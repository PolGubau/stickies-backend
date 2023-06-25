import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  newPassword: string;
}
