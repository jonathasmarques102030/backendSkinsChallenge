import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

// Defina a lista de categorias permitidas
const ALLOWED_CATEGORIES = ['rifles', 'pistolas', 'luvas', 'facas'];

// Função para validar a categoria
function isValidCategory(category: string): boolean {
  return ALLOWED_CATEGORIES.includes(category);
}

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ItemCreateInput) {
    // Valida a categoria
    if (!isValidCategory(data.category)) {
      throw new Error(`Categoria inválida: ${data.category}`);
    }
    return this.prisma.item.create({ data });
  }

  async findAll(filter?: {
    name?: string;
    float?: string;
    price?: number;
    category?: string;
    orderBy?: 'price' | 'float';
    sortOrder?: 'asc' | 'desc';
  }) {
    // Valida a categoria no filtro, se presente
    if (filter?.category && !isValidCategory(filter.category)) {
      throw new Error(`Categoria inválida: ${filter.category}`);
    }

    const where: Prisma.ItemWhereInput = {
      ...(filter?.name && {
        name: { contains: filter.name, mode: 'insensitive' },
      }),
      ...(filter?.float && { float: filter.float }),
      ...(filter?.price && { price: { equals: filter.price } }),
      ...(filter?.category && {
        category: { contains: filter.category, mode: 'insensitive' },
      }),
    };

    const orderBy = filter?.orderBy
      ? { [filter.orderBy]: filter.sortOrder || 'asc' }
      : undefined;

    return this.prisma.item.findMany({ where, orderBy });
  }

  async findOne(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.ItemUpdateInput) {
    // Verifica se data.category é uma string antes de validar
    if (typeof data.category === 'string') {
      if (!isValidCategory(data.category)) {
        throw new Error(`Categoria inválida: ${data.category}`);
      }
    }
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