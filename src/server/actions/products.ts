"use server";
import { productDetailsSchema } from "@/schema/products";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createProduct as createProductDB,
  updateProduct as updateProductDB,
  deleteProduct as deleteProductDB,
} from "@/server/db/products";
import { redirect } from "next/navigation";

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
