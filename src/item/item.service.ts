import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ItemCreateInput) {
    return this.prisma.item.create({ data });
  }

  async findAll(filter?: {
    name?: string;
    float?: string;
    price?: number;
    category?: string;
  }) {
    const where: Prisma.ItemWhereInput = {
      ...(filter?.name && {
        name: { contains: filter.name, mode: 'insensitive' },
      }),
      ...(filter?.float && { float: filter.float }),
      ...(filter?.price && { price: { lte: filter.price } }),
      ...(filter?.category && {
        category: { contains: filter.category, mode: 'insensitive' },
      }),
    };

    return this.prisma.item.findMany({ where });
  }

  async findOne(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.ItemUpdateInput) {
    return this.prisma.item.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.item.delete({
      where: { id },
    });
  }
}
