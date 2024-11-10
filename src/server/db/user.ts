import { db } from "@/drizzle/db";
import { ProductTable, UserSubscriptionTable } from "@/drizzle/schema";
import { CACHE_TAGS, revalidateDbCache } from "@/lib/cache";
import { eq } from "drizzle-orm";

export async function deleteUser(clerkUserId: string) {
  const { subscription, product } = await db.transaction(async (tx) => {
    const [subscription] = await tx
      .delete(UserSubscriptionTable)
      .where(eq(UserSubscriptionTable.clerkUserId, clerkUserId))
      .returning({ id: UserSubscriptionTable.clerkUserId });

    const [product] = await tx
      .delete(ProductTable)
      .where(eq(ProductTable.clerkUserId, clerkUserId))
      .returning({ id: ProductTable.id });

    return { subscription, product };
  });

  revalidateDbCache({
    tag: CACHE_TAGS.subscription,
    userId: clerkUserId,
    id: subscription.id,
  });

  revalidateDbCache({
    tag: CACHE_TAGS.products,
    userId: clerkUserId,
    id: product.id,
  });
}
