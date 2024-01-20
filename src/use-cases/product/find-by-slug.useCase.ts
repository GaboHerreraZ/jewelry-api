import { Product } from '../../domains/model';
import { ProductRepository } from '../../domains/repository';

export class FindBySlugUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(slug: string): Promise<Product> {
    return await this.productRepository.findBySlug(slug);
  }
}
