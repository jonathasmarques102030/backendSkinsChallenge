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
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemsService: ItemService) {}

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
  ) {
    return this.itemsService.findAll({
      name,
      float,
      price: price ? parseFloat(price) : undefined,
      category,
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
