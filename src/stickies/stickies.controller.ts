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
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { StickiesEntity } from './entities/sticky.entity';
import { StickyService } from './stickies.service';

@Controller('stickies')
@ApiTags('Stickies')
export class StickiesController {
  constructor(private readonly StickyService: StickyService) {}

  @Get('findAllByUserID/:userId')
  @ApiOperation({ summary: 'Find all stickies by user id' })
  findAll(@Param('userId') userId: number) {
    return this.StickyService.findAllByUserID(+userId);
  }

  //

  @Get('getStickyAndItsTag/:stickyID')
  @ApiOperation({ summary: 'Find a sticky and its tags by sticky id' })
  getStickyAndItsTag(@Param('stickyID') stickyID: number) {
    return this.StickyService.getStickyAndItsTag(+stickyID);
  }

  //

  @Get(':id')
  @ApiOperation({ summary: 'Find one sticky by id' })
  async findOne(@Param('id') id: number): Promise<StickiesEntity> {
    const sticky = await this.StickyService.findOne(+id);

    if (!sticky) {
      throw new NotFoundException('Sticky not found');
    }

    return sticky;
  }

  @Post()
  @ApiCreatedResponse({ type: StickiesEntity })
  @ApiOperation({ summary: 'Create a new sticky' })
  create(@Body() createStickyDto: CreateStickyDto) {
    return this.StickyService.create(createStickyDto, +createStickyDto.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sticky' })
  @ApiOkResponse({ type: StickiesEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStickyDto: UpdateStickyDto,
  ) {
    return this.StickyService.update(+id, updateStickyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sticky' })
  @ApiOkResponse({ type: StickiesEntity })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId') userId: number,
  ) {
    return this.StickyService.remove(+id, +userId);
  }
  @Delete(':userId')
  @ApiOperation({ summary: 'Delete all stickies by user id' })
  @ApiOkResponse({ type: StickiesEntity })
  removeAllByUserID(@Param('userId') userId: number) {
    return this.StickyService.removeAllByUserID(+userId);
  }
}
