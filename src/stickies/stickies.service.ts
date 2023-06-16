import { Injectable } from '@nestjs/common';
import { CreateStickyDto } from './dto/create-sticky.dto';
import { UpdateStickyDto } from './dto/update-sticky.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StickiesService {
  constructor(private prisma: PrismaService) {}

  create(createStickyDto: CreateStickyDto) {
    return this.prisma.sticky.create({ data: createStickyDto });
  }

  findAll() {
    return this.prisma.sticky.findMany();
  }

  findOne(id: number) {
    return this.prisma.sticky.findUnique({ where: { id } });
  }

  update(id: number, updateStickyDto: UpdateStickyDto) {
    return this.prisma.sticky.update({
      where: { id },
      data: updateStickyDto,
    });
  }

  remove(id: number) {
    return this.prisma.sticky.delete({ where: { id } });
  }
}
