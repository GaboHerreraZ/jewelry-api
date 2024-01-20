import { Controller, Get, Inject, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../exception/exception.filter';
import { ApiTags } from '@nestjs/swagger';
import { UseCaseCategoryProxyModule } from '../useCase-proxy';
import { UseCaseProxy } from '../useCase-proxy/use-case.proxy';
import { FindAllUseCase } from '../../use-cases/category/find-all.useCase';

@UseFilters(HttpExceptionFilter)
@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(
    @Inject(UseCaseCategoryProxyModule.FIND_ALL_USECASE_PROXY)
    private readonly findAllUseCaseProxy: UseCaseProxy<FindAllUseCase>,
  ) {}

  @Get()
  async findAll() {
    return this.findAllUseCaseProxy.getInstance().execute();
  }
}
