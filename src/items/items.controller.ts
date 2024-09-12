import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: Prisma.ItemCreateInput) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('float') float?: string,
    @Query('price') price?: string,
    @Query('category') category?: string,
    @Query('orderBy') orderBy?: 'price' | 'float',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc'
  ) {
    return this.itemsService.findAll({
      name,
      float,
      price: price ? parseFloat(price) : undefined,
      category,
      orderBy,
      sortOrder
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: Prisma.ItemUpdateInput,
  ) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
