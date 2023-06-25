import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagStickyService {
  constructor(private prisma: PrismaService) {}

  async linkTagToSticky(tagId: number, stickyId: number): Promise<void> {
    // Check if the tag and sticky exist
    const tag = await this.prisma.tag.findUnique({ where: { id: tagId } });
    const sticky = await this.prisma.sticky.findUnique({
      where: { id: stickyId },
    });

    if (!tag || !sticky) {
      throw new NotFoundException('Tag or Sticky not found');
    }

    // check if the tag is already linked to the sticky
    const tagAlreadyLinked = await this.prisma.sticky.findFirst({
      where: { id: stickyId, tags: { some: { id: tagId } } },
    });

    if (tagAlreadyLinked) {
      throw new ConflictException('Tag already linked to sticky');
    }

    // Link the tag to the sticky
    await this.prisma.sticky.update({
      where: { id: stickyId },
      data: { tags: { connect: { id: tagId } } },
    });
  }

  async deleteLinkTagToSticky(tagId: number, stickyId: number): Promise<void> {
    // Check if the tag and sticky exist
    const tag = await this.prisma.tag.findUnique({ where: { id: tagId } });
    const sticky = await this.prisma.sticky.findUnique({
      where: { id: stickyId },
    });

    if (!tag || !sticky) {
      throw new NotFoundException('Tag or Sticky not found');
    }

    // Link the tag to the sticky
    await this.prisma.sticky.update({
      where: { id: stickyId },
      data: { tags: { disconnect: { id: tagId } } },
    });
  }
}
