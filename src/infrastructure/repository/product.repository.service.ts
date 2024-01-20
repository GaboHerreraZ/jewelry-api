import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domains/repository/product-repository.interface';
import { PrismaService } from '../../lib/prisma.service';
import { Product } from '../../domains/model';
import {
  Product as ProductPrisma,
  Category as CategoryPrisma,
  ProductImage as ProductImagePrisma,
} from '@prisma/client';

@Injectable()
export class ProductRespositoryService implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const reponse = await this.prismaService.product.findMany({
      include: { category: true, productImage: true },
    });
    return reponse.map(this.mapProduct);
  }

  async findById(id: string) {
    const reponse = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        category: true,
        productImage: true,
      },
    });
    return this.mapProduct(reponse);
  }

  async findByCategory(categoryId: string) {
    const reponse = await this.prismaService.product.findMany({
      where: { categoryId: categoryId },
      include: {
        category: true,
        productImage: true,
      },
    });

    return reponse.map(this.mapProduct);
  }

  async findBySlug(slug: string) {
    const response = await this.prismaService.product.findUnique({
      where: { slug: slug },
      include: {
        category: true,
        productImage: true,
      },
    });
    return this.mapProduct(response);
  }

  private mapProduct(
    product: ProductPrisma & {
      category: CategoryPrisma;
      productImage: ProductImagePrisma[];
    },
  ) {
    return {
      ...product,
      category: product.category,
      productImage: product.productImage.map((image) => ({
        url: image.url,
        id: image.id,
      })),
    } as Product;
  }
}
