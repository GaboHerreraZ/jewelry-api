import { Product } from '../../domains/model';
import { ProductRepository } from '../../domains/repository';

export class FindByCategoryUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(category: string): Promise<Product[]> {
    return await this.productRepository.findByCategory(category);
  }
}
