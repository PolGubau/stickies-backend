import { Controller, Post, Param, Delete } from '@nestjs/common';
import { TagStickyService } from './tag-sticky.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tags/:tagId/stickies/:stickyId')
@ApiTags('Tags - Stickies')
export class TagStickyController {
  constructor(private tagStickyService: TagStickyService) {}

  @Post()
  @ApiOperation({
    summary: 'Link tag to sticky',
    description: 'Provide a tagId and a stickyId to link them together',
  })
  async linkTagToSticky(
    @Param('tagId') tagId: number,
    @Param('stickyId') stickyId: number,
  ): Promise<void> {
    await this.tagStickyService.linkTagToSticky(+tagId, +stickyId);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete link tag to sticky',
    description:
      'Provide a tagId and a stickyId to delete the link between them',
  })
  async deleteLinkTagToSticky(
    @Param('tagId') tagId: number,

    @Param('stickyId') stickyId: number,
  ): Promise<void> {
    await this.tagStickyService.deleteLinkTagToSticky(+tagId, +stickyId);
  }
}
