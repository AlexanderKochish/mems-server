import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  HttpException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MemsService } from './mems.service';
import { UpdateMemDto } from './dto/update-mem.dto';
import { CreateMemDto } from './dto/create-mem.dto';

@Controller('memes')
export class MemsController {
  constructor(private readonly memsService: MemsService) {}

  @Post('add')
  async create(@Body() dto: CreateMemDto) {
    try {
      const newMem = await this.memsService.create(dto);
      return newMem;
    } catch (error) {
      console.error('Error creating meme:', error);
      throw new HttpException(
        'Failed to create meme',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get()
  async findAll(@Query('search') search: string) {
    try {
      const mems = await this.memsService.findAll(search);
      return mems;
    } catch (error) {
      console.error('Error fetching memes:', error);
      throw new InternalServerErrorException('Failed to retrieve memes');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const mem = await this.memsService.findOne(id);
      if (!mem) {
        throw new NotFoundException('Meme not found');
      }
      return mem;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Incorrect ID or request');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMemDto: UpdateMemDto) {
    try {
      const updated = await this.memsService.update(id, updateMemDto);
      return updated;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('No meme found to update');
      }
      console.error('Update error:', error);
      throw new BadRequestException('Meme update error');
    }
  }
}
