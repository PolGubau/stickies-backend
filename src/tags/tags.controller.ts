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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a tag' })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get('findAllByUserID/:userId')
  @ApiOperation({ summary: 'Find all tags by user id' })
  findAll(@Param('userId') userId: number) {
    return this.tagsService.findAllFromUser(+userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one tag by id' })
  findOne(@Param('id') id: number) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tag' })
  update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag' })
  remove(@Param('id') id: number) {
    return this.tagsService.remove(+id);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete all tags by user id' })
  removeAllByUserID(@Param('userId') userId: number) {
    return this.tagsService.removeAllByUserID(+userId);
  }
}
