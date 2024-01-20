import { Category } from '../../domains/model';
import { CategoryRepository } from '../../domains/repository';

export class FindAllUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }
}
