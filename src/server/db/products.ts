import { db } from "@/drizzle/db";
import { desc, eq } from "drizzle-orm";

export function getProducts(userId: string, limit: number = 5) {
  return db.query.ProductTable.findMany({
    where: (products) => eq(products.clerkUserId, userId),
    orderBy: (pruducts) => desc(pruducts.createdAt),
    limit,
  });
}
