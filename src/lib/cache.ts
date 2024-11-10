import { revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";

export type ValidTags =
  | ReturnType<typeof getGlobalTag>
  | ReturnType<typeof getUserTag>
  | ReturnType<typeof getIdTag>;

export const CACHE_TAGS = {
  products: "products",
  productViews: "productViews",
  subscription: "subscription",
  countries: "countries",
  countryGroups: "countryGroups",
} as const;

export function getGlobalTag(tag: keyof typeof CACHE_TAGS) {
  return `global:${CACHE_TAGS[tag]}` as const;
}

export function getUserTag(userId: string, tag: keyof typeof CACHE_TAGS) {
  return `user:${userId}-${CACHE_TAGS[tag]}` as const;
}

export function getIdTag(id: string, tag: keyof typeof CACHE_TAGS) {
  return `id:${id}-${CACHE_TAGS[tag]}` as const;
}

export function clearFullCache() {
  revalidateTag("*");
}

/**
 * Caches an asynchronous function based on specified tags.

 * @param {T} cb - The asynchronous function to be cached.
 * @param {{ tags: ValidTags[] }} options - Options for the cache:
 *   - `tags`: An array of tags used to identify and invalidate cache entries.
 *     The `*` tag is added to ensure global invalidation.
 *
 * @returns {(...args: Parameters<T>) => Promise<ReturnType<T>>} - A new function that wraps the original callback, incorporating caching behavior.

 * @example
 * **Caching by Product ID:**
 * ```tsx
 * const cachedGetProduct = dbCache(getProductInternal, {
   tags: [getIdTag(productId, CACHE_TAGS.products)]
 });

 * const product = await cachedGetProduct(productId);
 * ```

 * **Caching by User ID:**
 * ```tsx
 * const cachedProducts = dbCache(getProductInternal, {
   tags: [getUserTag(userId, CACHE_TAGS.products)]
 });

 * const products = await cachedProducts(userId, { limit: 10 });
 * ```

 * **Note:** The `getIdTag`, `getUserTag`, and `getGlobalTag` helper functions are assumed to generate appropriate cache tags based on their inputs.
 * The `unstable_cache` function is used internally to provide the actual caching mechanism.
 */
export function dbCache<T extends (...args: any[]) => Promise<any>>(
  cb: T,
  { tags }: { tags: ValidTags[] }
): T {
  return cache(unstable_cache(cb, undefined, { tags: [...tags, "*"] })) as T;
}

export function revalidateDbCache({
  tag,
  userId,
  id,
}: {
  tag: keyof typeof CACHE_TAGS;
  userId?: string;
  id?: string;
}) {
  revalidateTag(getGlobalTag(tag));
  if (userId != null) {
    revalidateTag(getUserTag(userId, tag));
  }
  if (id != null) {
    revalidateTag(getIdTag(id, tag));
  }
}
