import { subscriptionTiers } from "@/data/subscriptionTiers";
import { db } from "@/drizzle/db";
import { UserSubscriptionTable } from "@/drizzle/schema";
import {
  CACHE_TAGS,
  dbCache,
  getUserTag,
  revalidateDbCache,
} from "@/lib/cache";
import { eq } from "drizzle-orm";

export async function createUserSubscription(
  data: typeof UserSubscriptionTable.$inferInsert
) {
  const [newSub] = await db
    .insert(UserSubscriptionTable)
    .values(data)
    .onConflictDoNothing({ target: UserSubscriptionTable.clerkUserId })
    .returning({
      id: UserSubscriptionTable.id,
      userId: UserSubscriptionTable.clerkUserId,
    });

  revalidateDbCache({
    tag: CACHE_TAGS.subscription,
    userId: newSub.userId,
    id: newSub.id,
  });

  return newSub;
}

export async function getUserSubscription(userId: string) {
  const cachedFn = dbCache(getUserSubscriptionInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.subscription)],
  });

  return cachedFn(userId);
}

export async function getUserSubscriptionTier(userId: string) {
  const subscription = await getUserSubscription(userId);
  if (!subscription)
    throw new Error(`no subscription for this user with userId -> ${userId}`);

  return subscriptionTiers[subscription.tier];
}

export async function getUserSubscriptionInternal(userId: string) {
  return db.query.UserSubscriptionTable.findFirst({
    where: (subscription) => eq(subscription.clerkUserId, userId),
  });
}
