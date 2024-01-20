import { Module } from '@nestjs/common';
import {
  UseCaseProductProxyModule,
  UseCaseCategoryProxyModule,
} from '../useCase-proxy';
import { ProductController } from './product.controller';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    UseCaseProductProxyModule.register(),
    UseCaseCategoryProxyModule.register(),
  ],
  controllers: [ProductController, CategoryController],
})
export class ControllersModule {}
