import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // @ApiCreatedResponse({ type: UserEntity })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }
  @Get('userAndStickies/:userId')
  @ApiOkResponse({ type: UserEntity })
  @ApiBearerAuth()

  // @UseGuards(JwtAuthGuard)
  getUserAndStickies(@Param('userId') userId: number) {
    return this.usersService.getUserAndStickies(+userId);
  }
  @Get('findAllUserInfo/:userId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  // @UseGuards(JwtAuthGuard)
  findAllUserInfo(@Param('userId') userId: number) {
    return this.usersService.findAllUserInfo(+userId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
