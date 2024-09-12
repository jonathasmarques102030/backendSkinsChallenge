import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Prisma } from '@prisma/client';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um item', async () => {
    const createItemDto: Prisma.ItemCreateInput = { 
      name: 'Rifle', 
      image: 'image_url', 
      category: 'rifles', 
      price: 500 
    };
    const createdItem = { 
      id: '63e6c0fda593bf4b5c3f62b3', 
      ...createItemDto, 
      float: null, // Adicionando float como null, já que é opcional
      createdAt: new Date(), 
      updatedAt: new Date() 
    };

    jest.spyOn(service, 'create').mockResolvedValueOnce(createdItem);

    const result = await controller.create(createItemDto);
    expect(result).toEqual(createdItem);
    expect(service.create).toHaveBeenCalledWith(createItemDto);
  });

  it('deve listar todos os itens', async () => {
    const items = [{ 
      id: '63e6c0fda593bf4b5c3f62b3', 
      name: 'Rifle', 
      image: 'image_url', 
      category: 'rifles', 
      price: 500, 
      float: null, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }];

    jest.spyOn(service, 'findAll').mockResolvedValueOnce(items);

    const result = await controller.findAll('Rifle');
    expect(result).toEqual(items);
    expect(service.findAll).toHaveBeenCalledWith({ 
      name: 'Rifle', 
      float: undefined, 
      price: undefined, 
      category: undefined, 
      orderBy: undefined, 
      sortOrder: undefined 
    });
  });

  it('deve buscar um item por ID', async () => {
    const item = { 
      id: '63e6c0fda593bf4b5c3f62b3', 
      name: 'Rifle', 
      image: 'image_url', 
      category: 'rifles', 
      price: 500, 
      float: null,
      createdAt: new Date(), 
      updatedAt: new Date() 
    };

    jest.spyOn(service, 'findOne').mockResolvedValueOnce(item);

    const result = await controller.findOne('63e6c0fda593bf4b5c3f62b3');
    expect(result).toEqual(item);
    expect(service.findOne).toHaveBeenCalledWith('63e6c0fda593bf4b5c3f62b3');
  });

  it('deve atualizar um item', async () => {
    const updateItemDto: Prisma.ItemUpdateInput = { name: 'Rifle Atualizado' };
    const updatedItem = { 
      id: '63e6c0fda593bf4b5c3f62b3', 
      name: 'Rifle Atualizado', 
      image: 'image_url', 
      category: 'rifles', 
      price: 500, 
      float: null, // Adicionando float como null
      createdAt: new Date(), 
      updatedAt: new Date() 
    };

    jest.spyOn(service, 'update').mockResolvedValueOnce(updatedItem);

    const result = await controller.update('63e6c0fda593bf4b5c3f62b3', updateItemDto);
    expect(result).toEqual(updatedItem);
    expect(service.update).toHaveBeenCalledWith('63e6c0fda593bf4b5c3f62b3', updateItemDto);
  });

  it('deve remover um item', async () => {
    const removedItem = { 
      id: '63e6c0fda593bf4b5c3f62b3', 
      name: 'Rifle', 
      image: 'image_url', 
      category: 'rifles', 
      price: 500, 
      float: null,
      createdAt: new Date(), 
      updatedAt: new Date() 
    };

    jest.spyOn(service, 'remove').mockResolvedValueOnce(removedItem);

    const result = await controller.remove('63e6c0fda593bf4b5c3f62b3');
    expect(result).toEqual(removedItem);
    expect(service.remove).toHaveBeenCalledWith('63e6c0fda593bf4b5c3f62b3');
  });
});