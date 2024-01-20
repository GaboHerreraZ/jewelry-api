import prisma from './prisma';
import { initialData } from './seed';

async function main() {
  await deleteDb();

  const { categories, products, images } = initialData;

  await prisma.category.createMany({
    data: categories,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id;
      return map;
    },
    {} as Record<string, string>,
  );

  const productPromise: any = [];

  products.forEach(async (product) => {
    const { type, ...rest } = product;
    productPromise.push(
      prisma.product.create({
        data: {
          ...rest,
          categoryId: categoriesMap[type],
        },
      }),
    );
  });

  await Promise.all(productPromise);

  const productsDB = await prisma.product.findMany();

  const imagesToSave = images.map((image, idx) => {
    return {
      ...image,
      productId: productsDB[idx].id,
    };
  });

  await prisma.productImage.createMany({
    data: imagesToSave,
  });
}

async function deleteDb() {
  console.log('Deleting database...');
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
}

(() => {
  // To generate database
  main();
  //to delete database
  //deleteDb();
})();
