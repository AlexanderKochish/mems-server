import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateMemDto } from './dto/update-mem.dto';
import { PrismaService } from 'src/services/prisma.service';
import { CreateMemDto } from './dto/create-mem.dto';

@Injectable()
export class MemsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateMemDto) {
    if (!dto.title || dto.title.length < 3 || dto.title.length > 100) {
      throw new HttpException('Invalid title', HttpStatus.BAD_REQUEST);
    }

    if (!dto.image || !/^https?:\/\/.+\.jpg$/.test(dto.image)) {
      throw new HttpException(
        'Invalid image URL (JPG only)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.likes < 0 || dto.likes > 99) {
      throw new HttpException(
        'Likes must be between 0 and 99',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prismaService.mem.create({
      data: {
        title: dto.title,
        image: dto.image,
        desc: dto.desc ?? '',
        likes: dto.likes,
      },
    });
  }

  async findAll() {
    return this.prismaService.mem.findMany();
  }

  async findOne(id: string) {
    const mem = await this.prismaService.mem.findUnique({ where: { id } });

    if (!mem) {
      throw new HttpException('Meme not found', HttpStatus.NOT_FOUND);
    }

    return mem;
  }

  async update(id: string, dto: UpdateMemDto) {
    const mem = await this.findOne(id);

    const editedMem = await this.prismaService.mem.update({
      where: { id: mem.id },
      data: { ...dto },
    });
    return editedMem;
  }
}
