import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('ItemsService', () => {
  let service: ItemsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService, PrismaService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um item com categoria válida', async () => {
    const createSpy = jest.spyOn(prisma.item, 'create').mockResolvedValueOnce({ id: '1', name: 'Rifle', category: 'rifles' } as any);

    const result = await service.create({
      name: 'Rifle',
      category: 'rifles',
    } as Prisma.ItemCreateInput);

    expect(result).toEqual({ id: '1', name: 'Rifle', category: 'rifles' });
    expect(createSpy).toHaveBeenCalled();
  });

  it('deve lançar um erro para categoria inválida', async () => {
    await expect(
      service.create({
        name: 'Item Inválido',
        category: 'invalid',
      } as Prisma.ItemCreateInput),
    ).rejects.toThrow('Categoria inválida: invalid');
  });
});
