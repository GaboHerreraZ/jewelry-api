import { Product } from '../../domains/model';
import { ProductRepository } from '../../domains/repository';

export class FindAllUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
