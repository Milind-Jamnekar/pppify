import { db } from "@/drizzle/db";
import {
  CountryGroupDiscountTable,
  ProductCustomizationTable,
  ProductTable,
} from "@/drizzle/schema";
import {
  CACHE_TAGS,
  dbCache,
  getIdTag,
  getUserTag,
  revalidateDbCache,
} from "@/lib/cache";
import { and, desc, eq, inArray, sql } from "drizzle-orm";

export function getProducts(userId: string, limit: number = 5) {
  const cachedFn = dbCache(getProductsInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.products)],
  });

  return cachedFn(userId, limit);
}

function getProductsInternal(userId: string, limit: number = 5) {
  return db.query.ProductTable.findMany({
    where: (products) => eq(products.clerkUserId, userId),
    orderBy: (pruducts) => desc(pruducts.createdAt),
    limit,
  });
}

export function getProduct(userId: string, productId: string) {
  const cachedFn = dbCache(getProductInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.products)],
  });

  return cachedFn(userId, productId);
}

function getProductInternal(userId: string, productId: string) {
  return db.query.ProductTable.findFirst({
    where: (products) =>
      and(eq(products.clerkUserId, userId), eq(products.id, productId)),
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

export async function updateCountryDiscounts(
  deleteGroup: { countryGroupId: string }[],
  insertGroup: (typeof CountryGroupDiscountTable.$inferInsert)[] | undefined,
  productId: string,
  userId: string
) {
  const product = await getProduct(userId, productId);
  if (product == null) return false;

  await db.transaction(async (tx) => {
    if (deleteGroup.length > 0) {
      await tx.delete(CountryGroupDiscountTable).where(
        and(
          eq(CountryGroupDiscountTable.productId, productId),
          inArray(
            CountryGroupDiscountTable.countryGroupId,
            deleteGroup.map((group) => group.countryGroupId)
          )
        )
      );
    }

    if (insertGroup && insertGroup.length > 0) {
      await tx
        .insert(CountryGroupDiscountTable)
        .values(insertGroup)
        .onConflictDoUpdate({
          target: [
            CountryGroupDiscountTable.productId,
            CountryGroupDiscountTable.countryGroupId,
          ],
          set: {
            coupon: sql.raw(
              `excluded.${CountryGroupDiscountTable.coupon.name}`
            ),
            discountPercentage: sql.raw(
              `excluded.${CountryGroupDiscountTable.discountPercentage.name}`
            ),
          },
        });
    }
  });

  revalidateDbCache({
    tag: CACHE_TAGS.products,
    userId,
    id: productId,
  });
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

export async function getProductCountryGroups({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const cachedFn = dbCache(getProductCountryGroupsInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.products)],
  });

  return cachedFn(productId, userId);
}

async function getProductCountryGroupsInternal(
  productId: string,
  userId: string
) {
  const product = await getProduct(userId, productId);
  if (product == null) return [];

  const data = await db.query.CountryGroupTable.findMany({
    with: {
      countries: {
        columns: {
          name: true,
          code: true,
        },
      },
      countryGroupDiscounts: {
        columns: {
          coupon: true,
          discountPercentage: true,
        },
        where: ({ productId: id }, { eq }) => eq(id, productId),
        limit: 1,
      },
    },
  });

  return data.map((group) => {
    return {
      id: group.id,
      name: group.name,
      recommendedDiscountPercentage: group.recommendedDiscountPercentage,
      countries: group.countries,
      discount: group.countryGroupDiscounts.at(0),
    };
  });
}

export async function getProductCustomization(
  productId: string,
  userId: string
) {
  const cachedFn = dbCache(getProductCustomizationInternal, {
    tags: [getIdTag(productId, CACHE_TAGS.products)],
  });

  return cachedFn(productId, userId);
}

async function getProductCustomizationInternal(
  productId: string,
  userId: string
) {
  const data = await db.query.ProductTable.findFirst({
    where: (product) =>
      and(eq(product.id, productId), eq(product.clerkUserId, userId)),
    with: { productCustomization: true },
  });

  return data?.productCustomization;
}
