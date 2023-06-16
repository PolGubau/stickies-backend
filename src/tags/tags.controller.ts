import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get('findAllByUserID/:userId')
  findAll(@Param('userId') userId: number) {
    return this.tagsService.findAllFromUser(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tagsService.remove(+id);
  }
}
