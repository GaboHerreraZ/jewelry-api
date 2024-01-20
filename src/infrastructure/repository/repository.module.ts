import { Module } from '@nestjs/common';
import { ProductRespositoryService } from './product.repository.service';
import { PrismaService } from 'src/lib/prisma.service';
import { CategoryRespositoryService } from './category.repository.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    ProductRespositoryService,
    CategoryRespositoryService,
  ],
  exports: [ProductRespositoryService, CategoryRespositoryService],
})
export class RepositoryModule {}
