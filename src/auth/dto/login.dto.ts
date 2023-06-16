/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  usernameOrEmail: string;
  @ApiProperty()
  password: string;
}
