import { Module, DynamicModule } from '@nestjs/common';
import { UseCaseProxy } from './use-case.proxy';
import { ProductRespositoryService, RepositoryModule } from '../repository';
import {
  FindAllUseCase,
  FindByCategoryUseCase,
  FindByIdUseCase,
  FindBySlugUseCase,
} from '../../use-cases/product';

@Module({
  imports: [RepositoryModule],
})
export class UseCaseProductProxyModule {
  static FIND_ALL_USECASE_PROXY = 'findAllProduct';
  static FIND_BY_ID_USECASE_PROXY = 'findProductById';
  static FIND_BY_CATEGORY_USECASE_PROXY = 'findProductByCategory';
  static FIND_BY_SLUG_USECASE_PROXY = 'findProductBySlug';

  static register(): DynamicModule {
    return {
      module: UseCaseProductProxyModule,
      providers: [
        {
          inject: [ProductRespositoryService],
          provide: UseCaseProductProxyModule.FIND_ALL_USECASE_PROXY,
          useFactory: (productRepositoryService: ProductRespositoryService) =>
            new UseCaseProxy(new FindAllUseCase(productRepositoryService)),
        },
        {
          inject: [ProductRespositoryService],
          provide: UseCaseProductProxyModule.FIND_BY_ID_USECASE_PROXY,
          useFactory: (productRepositoryService: ProductRespositoryService) =>
            new UseCaseProxy(new FindByIdUseCase(productRepositoryService)),
        },
        {
          inject: [ProductRespositoryService],
          provide: UseCaseProductProxyModule.FIND_BY_CATEGORY_USECASE_PROXY,
          useFactory: (productRepositoryService: ProductRespositoryService) =>
            new UseCaseProxy(
              new FindByCategoryUseCase(productRepositoryService),
            ),
        },
        {
          inject: [ProductRespositoryService],
          provide: UseCaseProductProxyModule.FIND_BY_SLUG_USECASE_PROXY,
          useFactory: (productRepositoryService: ProductRespositoryService) =>
            new UseCaseProxy(new FindBySlugUseCase(productRepositoryService)),
        },
      ],
      exports: [
        UseCaseProductProxyModule.FIND_ALL_USECASE_PROXY,
        UseCaseProductProxyModule.FIND_BY_ID_USECASE_PROXY,
        UseCaseProductProxyModule.FIND_BY_CATEGORY_USECASE_PROXY,
        UseCaseProductProxyModule.FIND_BY_SLUG_USECASE_PROXY,
      ],
    };
  }
}
