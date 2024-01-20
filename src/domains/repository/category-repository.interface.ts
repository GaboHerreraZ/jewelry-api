import { Category } from '../model';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
}
