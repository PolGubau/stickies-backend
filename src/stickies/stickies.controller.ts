import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { CreateStickyDto } from './dto/create-sticky.dto';
import { UpdateStickyDto } from './dto/update-sticky.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { StickiesEntity } from './entities/sticky.entity';
import { StickyService } from './stickies.service';

@Controller('stickies')
@ApiTags('Stickies')
export class StickiesController {
  constructor(private readonly StickyService: StickyService) {}

  @Get('findAllByUserID/:userId')
  findAll(@Param('userId') userId: number) {
    return this.StickyService.findAllByUserID(+userId);
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<StickiesEntity> {
    const sticky = await this.StickyService.findOne(+id);

    if (!sticky) {
      throw new NotFoundException('Sticky not found');
    }

    return sticky;
  }

  @Post()
  @ApiCreatedResponse({ type: StickiesEntity })
  create(@Body() createStickyDto: CreateStickyDto) {
    return this.StickyService.create(createStickyDto, +createStickyDto.userId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: StickiesEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStickyDto: UpdateStickyDto,
  ) {
    return this.StickyService.update(+id, updateStickyDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: StickiesEntity })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId') userId: number,
  ) {
    return this.StickyService.remove(+id, +userId);
  }
}
