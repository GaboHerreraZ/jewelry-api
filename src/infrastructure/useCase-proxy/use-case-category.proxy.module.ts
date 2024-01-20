import { Module, DynamicModule } from '@nestjs/common';
import { UseCaseProxy } from './use-case.proxy';
import { CategoryRespositoryService, RepositoryModule } from '../repository';
import { FindAllUseCase } from '../../use-cases/category/find-all.useCase';
import { CategoryRepository } from 'src/domains/repository';

@Module({
  imports: [RepositoryModule],
})
export class UseCaseCategoryProxyModule {
  static FIND_ALL_USECASE_PROXY = 'findAllCategory';

  static register(): DynamicModule {
    return {
      module: UseCaseCategoryProxyModule,
      providers: [
        {
          inject: [CategoryRespositoryService],
          provide: UseCaseCategoryProxyModule.FIND_ALL_USECASE_PROXY,
          useFactory: (categoryRepositoryService: CategoryRespositoryService) =>
            new UseCaseProxy(new FindAllUseCase(categoryRepositoryService)),
        },
      ],
      exports: [UseCaseCategoryProxyModule.FIND_ALL_USECASE_PROXY],
    };
  }
}
