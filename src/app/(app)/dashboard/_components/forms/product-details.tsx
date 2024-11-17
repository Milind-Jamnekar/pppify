"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createProduct, updateProduct } from "@/server/actions/products";
import { productDetailsSchema } from "@/schema/products";
import { AsteriskIcon } from "lucide-react";
import { toast } from "sonner";

export function ProductDetailsForm({
  product,
}: {
  product?: {
    id: string;
    name: string;
    description: string | null;
    url: string;
  };
}) {
  const form = useForm<z.infer<typeof productDetailsSchema>>({
    resolver: zodResolver(productDetailsSchema),
    defaultValues: product
      ? { ...product, description: product.description ?? "" }
      : {
          name: "",
          url: "",
          description: "",
        },
  });

  async function onSubmit(values: z.infer<typeof productDetailsSchema>) {
    const action =
      product == null ? createProduct : updateProduct.bind(null, product.id);
    const data = await action(values);

    if (data?.message) {
      if (data.error) {
        toast.error(
          product ? "Error in updating product" : "Error in creating product",
          {
            description: data.message,
          }
        );
      } else {
        toast.success(
          product
            ? "Successfully updated product details"
            : "Successfully created product",
          {
            description: data.message,
          }
        );
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Product Name
                  <AsteriskIcon className="text-destructive inline size-3 align-top" />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Enter your website URL
                  <AsteriskIcon className="text-destructive inline size-3 align-top" />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Include the protocol (http/https) and the full path to the
                  sales page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea className="min-h-20 resize-none" {...field} />
              </FormControl>
              <FormDescription>
                An optional description to help distinguish your product from
                other products
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-end">
          <Button
            isloading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

{
  /* <AsteriskIcon className="text-destructive inline size-3 align-top" /> */
}
