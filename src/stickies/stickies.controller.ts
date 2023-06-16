import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StickiesService } from './stickies.service';
import { CreateStickyDto } from './dto/create-sticky.dto';
import { UpdateStickyDto } from './dto/update-sticky.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StickyEntity } from './entities/sticky.entity';

@Controller('stickies')
@ApiTags('Stickies')
export class StickiesController {
  constructor(private readonly stickiesService: StickiesService) {}

  @Post()
  @ApiCreatedResponse({ type: StickyEntity })
  create(@Body() createStickyDto: CreateStickyDto) {
    return this.stickiesService.create(createStickyDto);
  }

  @Get()
  @ApiOkResponse({ type: StickyEntity, isArray: true })
  findAll() {
    return this.stickiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: StickyEntity })
  findOne(@Param('id') id: number) {
    return this.stickiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: StickyEntity })
  update(@Param('id') id: number, @Body() updateStickyDto: UpdateStickyDto) {
    return this.stickiesService.update(+id, updateStickyDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: StickyEntity })
  remove(@Param('id') id: number) {
    return this.stickiesService.remove(+id);
  }
}
