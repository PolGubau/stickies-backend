import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDTO: CreateTagDto): Promise<TagEntity> {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createTagDTO.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tag = await this.prisma.tag.create({
      data: {
        ...createTagDTO,
      },
    });

    return tag;
  }

  async findAllFromUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const allTags = this.prisma.tag.findMany({
      where: {
        userId, // Filter tags by user ID
      },
    });

    return allTags;
  }

  async findOne(id: number) {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<TagEntity> {
    // Check if the tag exists
    const existingSticky = await this.prisma.tag.findFirst({
      where: { id },
    });

    if (!existingSticky) {
      throw new NotFoundException('Tag not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: updateTagDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the tag
    const newTag = await this.prisma.tag.update({
      where: { id },
      data: {
        ...updateTagDto,
      },
    });

    return newTag;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
