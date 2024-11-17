"use server";
import {
  productCountryDiscountsSchema,
  productDetailsSchema,
} from "@/schema/products";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createProduct as createProductDB,
  updateProduct as updateProductDB,
  deleteProduct as deleteProductDB,
  updateCountryDiscounts as updateCountryDiscountsDb,
} from "@/server/db/products";
import { redirect } from "next/navigation";
import { dbCache } from "@/lib/cache";

export async function createProduct(
  unsafeData: z.infer<typeof productDetailsSchema>
) {
  const { userId } = await auth();
  const { success, data } = productDetailsSchema.safeParse(unsafeData);

  if (!success || userId === null) {
    return { error: true, message: "There was an error creating product" };
  }

  const { id } = await createProductDB({ ...data, clerkUserId: userId });
  redirect(`/dashboard/products/${id}/edit?tab=countries`);
}

export async function updateProduct(
  id: string,
  unsafeData: z.infer<typeof productDetailsSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { userId } = await auth();
  const { success, data } = productDetailsSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true, message: "There was an error updating your product" };
  }

  const isSuccess = await updateProductDB(data, { id, userId });

  return {
    error: !isSuccess,
    message: isSuccess
      ? "Product details updated"
      : "There was an error updating your product",
  };
}

export async function deleteProduct(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return { error: true, message: "There was an error updating your product" };
  }

  const isSuccess = await deleteProductDB(userId, id);

  return {
    error: !isSuccess,
    message: isSuccess
      ? "Product details updated"
      : "There was an error updating your product",
  };
}

export async function updateCountryDiscounts(
  id: string,
  unsafeData: z.infer<typeof productCountryDiscountsSchema>
) {
  const { userId } = await auth();
  const { success, data } = productCountryDiscountsSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return {
      error: true,
      message: "There was an error saving your country discounts",
    };
  }

  const insert: {
    countryGroupId: string;
    productId: string;
    coupon: string;
    discountPercentage: number;
  }[] = [];
  const deleteIds: { countryGroupId: string }[] = [];

  data.groups.forEach((group) => {
    if (
      group.coupon != null &&
      group.coupon.length > 0 &&
      group.discountPercentage != null &&
      group.discountPercentage > 0
    ) {
      insert.push({
        countryGroupId: group.countryGroupId,
        coupon: group.coupon,
        discountPercentage: group.discountPercentage / 100,
        productId: id,
      });
    } else {
      deleteIds.push({ countryGroupId: group.countryGroupId });
    }
  });

  await updateCountryDiscountsDb(deleteIds, insert, id, userId);

  return { error: false, message: "Country discounts saved" };
}

export async function updateProductCustomization(params: type) {}
