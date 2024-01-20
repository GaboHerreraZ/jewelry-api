import { Product } from '../model';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  findBySlug(slug: string): Promise<Product>;
  findByCategory(category: string): Promise<Product[]>;
}
