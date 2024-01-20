import { Controller, Get, Inject, Param, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../exception/exception.filter';
import { ApiTags } from '@nestjs/swagger';
import { UseCaseProductProxyModule } from '../useCase-proxy';
import { UseCaseProxy } from '../useCase-proxy/use-case.proxy';
import {
  FindAllUseCase,
  FindByCategoryUseCase,
  FindByIdUseCase,
  FindBySlugUseCase,
} from '../../use-cases/product';

@UseFilters(HttpExceptionFilter)
@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(
    @Inject(UseCaseProductProxyModule.FIND_ALL_USECASE_PROXY)
    private readonly findAllUseCaseProxy: UseCaseProxy<FindAllUseCase>,
    @Inject(UseCaseProductProxyModule.FIND_BY_ID_USECASE_PROXY)
    private readonly findByIdUseCase: UseCaseProxy<FindByIdUseCase>,
    @Inject(UseCaseProductProxyModule.FIND_BY_SLUG_USECASE_PROXY)
    private readonly findBySlugUseCase: UseCaseProxy<FindBySlugUseCase>,
    @Inject(UseCaseProductProxyModule.FIND_BY_CATEGORY_USECASE_PROXY)
    private readonly findByCategoryUseCase: UseCaseProxy<FindByCategoryUseCase>,
  ) {}

  @Get()
  async findAll() {
    return this.findAllUseCaseProxy.getInstance().execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.findByIdUseCase.getInstance().execute(id);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return this.findByCategoryUseCase.getInstance().execute(categoryId);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.findBySlugUseCase.getInstance().execute(slug);
  }
}
