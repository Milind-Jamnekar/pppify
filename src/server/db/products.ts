import { db } from "@/drizzle/db";
import { ProductCustomizationTable, ProductTable } from "@/drizzle/schema";
import { and, desc, eq } from "drizzle-orm";

export function getProducts(userId: string, limit: number = 5) {
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
      .returning({ id: ProductTable.id });

    await tx
      .insert(ProductCustomizationTable)
      .values({ productId: newProduct.id })
      .onConflictDoNothing({ target: ProductCustomizationTable.productId }); // Ignore conflict

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
      // revalidateDbCache({
      //   tag: CACHE_TAGS.products,
      //   userId,
      //   id,
      // });
    }

    return rowCount > 0;
  }

  return false;
}
