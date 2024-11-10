import { db } from "@/drizzle/db";
import { ProductCustomizationTable, ProductTable } from "@/drizzle/schema";
import {
  CACHE_TAGS,
  dbCache,
  getUserTag,
  revalidateDbCache,
} from "@/lib/cache";
import { and, desc, eq } from "drizzle-orm";

export function getProducts(userId: string, limit: number = 5) {
  const cachedFn = dbCache(getProductsInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.products)],
  });

  return cachedFn(userId, limit);
}

export function getProductsInternal(userId: string, limit: number = 5) {
  return db.query.ProductTable.findMany({
    where: (products) => eq(products.clerkUserId, userId),
    orderBy: (pruducts) => desc(pruducts.createdAt),
    limit,
  });
}

export async function createProduct(product: typeof ProductTable.$inferInsert) {
  return db.transaction(async (tx) => {
    const [newProduct] = await tx
      .insert(ProductTable)
      .values(product)
      .returning({ id: ProductTable.id, userId: ProductTable.clerkUserId });

    await tx
      .insert(ProductCustomizationTable)
      .values({ productId: newProduct.id })
      .onConflictDoNothing({ target: ProductCustomizationTable.productId }); // Ignore conflict

    revalidateDbCache({
      tag: CACHE_TAGS.products,
      userId: newProduct.userId,
      id: newProduct.id,
    });

    return newProduct;
  });
}

export async function updateProduct(
  data: Partial<typeof ProductTable.$inferInsert>,
  { id, userId }: { id: string; userId: string }
) {
  const { rowCount } = await db
    .update(ProductTable)
    .set(data)
    .where(and(eq(ProductTable.clerkUserId, userId), eq(ProductTable.id, id)));
  if (rowCount) {
    if (rowCount > 0) {
      revalidateDbCache({
        tag: CACHE_TAGS.products,
        userId,
        id,
      });
    }

    return rowCount > 0;
  }

  return false;
}

export async function deleteProduct(userId: string, id: string) {
  const { rowCount } = await db
    .delete(ProductTable)
    .where(and(eq(ProductTable.clerkUserId, userId), eq(ProductTable.id, id)));

  if (rowCount) {
    if (rowCount > 0) {
      revalidateDbCache({
        tag: CACHE_TAGS.products,
        userId,
        id,
      });
      //everything is nice and shine
      return true;
    }
  }

  //this means something is wrong while deleting product
  return false;
}
