import { Category } from './category.model';
import { ProductImage } from './product-image.model';

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  available: boolean;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  productImage?: ProductImage[];
}
