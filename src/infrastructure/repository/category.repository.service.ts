import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma.service';
import { Category } from '../../domains/model';
import { CategoryRepository } from 'src/domains/repository';

@Injectable()
export class CategoryRespositoryService implements CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const reponse = await this.prismaService.category.findMany();
    return reponse.map(
      (category) =>
        ({
          ...category,
        }) as Category,
    );
  }
}
