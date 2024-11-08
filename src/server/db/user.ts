import { db } from "@/drizzle/db";
import { ProductTable, UserSubscriptionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export function deleteUser(clerkUserId: string) {
  return db.transaction(async (tx) => {
    tx.delete(UserSubscriptionTable).where(
      eq(UserSubscriptionTable.clerkUserId, clerkUserId)
    );

    tx.delete(ProductTable).where(eq(ProductTable.clerkUserId, clerkUserId));
  });
}
