import { Product } from '../../domains/model';
import { ProductRepository } from '../../domains/repository';

export class FindByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    return await this.productRepository.findById(id);
  }
}
