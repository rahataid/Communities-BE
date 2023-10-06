import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    await  this.prisma.category.create({
      data: {
        name:name
      },
    });

    return {message:"Category created Successfully", status:201}
  }

  findAll() {
    return this.prisma.category.findMany();
  }
}
