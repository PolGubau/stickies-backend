import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStickyDto } from './dto/create-sticky.dto';
import { UpdateStickyDto } from './dto/update-sticky.dto';
import { StickiesEntity } from './entities/sticky.entity';
import { Sticky } from '@prisma/client';

@Injectable()
export class StickyService {
  constructor(private prisma: PrismaService) {}

  async create(
    createStickyDto: CreateStickyDto,
    userId: number,
  ): Promise<StickiesEntity> {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const sticky = await this.prisma.sticky.create({
      data: {
        ...createStickyDto,
      },
    });

    return sticky;
  }

  async findAllByUserID(userId: number): Promise<Sticky[]> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.sticky.findMany({
      where: {
        userId: userId, // Filter stickies by user ID
      },
    });
  }

  async findOne(id: number): Promise<StickiesEntity> {
    const sticky = await this.prisma.sticky.findUnique({
      where: { id },
    });

    if (!sticky) {
      throw new NotFoundException('Sticky not found');
    }

    return sticky;
  }

  async update(
    id: number,
    updateStickyDto: UpdateStickyDto,
  ): Promise<StickiesEntity> {
    // Check if the sticky exists and belongs to the user
    const existingSticky = await this.prisma.sticky.findFirst({
      where: { id },
    });

    if (!existingSticky) {
      throw new NotFoundException('Sticky not found');
    }

    // Update the sticky
    const updatedSticky = await this.prisma.sticky.update({
      where: { id },
      data: updateStickyDto,
    });

    return updatedSticky;
  }

  async remove(id: number, userId: number): Promise<void> {
    // Check if the sticky exists and belongs to the user
    const existingSticky = await this.prisma.sticky.findFirst({
      where: { id, userId },
    });

    if (!existingSticky) {
      throw new NotFoundException('Sticky not found');
    }

    // Delete the sticky
    await this.prisma.sticky.delete({ where: { id } });
  }

  async removeAllByUserID(userId: number): Promise<void> {
    // Check if the sticky exists and belongs to the user
    const existingSticky = await this.prisma.sticky.findFirst({
      where: { userId },
    });

    if (!existingSticky) {
      throw new NotFoundException('Sticky not found');
    }

    // Delete the sticky
    await this.prisma.sticky.deleteMany({ where: { userId } });
  }
}
