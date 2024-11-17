import { Button } from "@/components/ui/button";
import { getProducts } from "@/server/db/products";
import { auth } from "@clerk/nextjs/server";
import { PlusIcon } from "lucide-react";
import EmptyProductPage from "../_components/empty-product-page";
import { ProductGrid } from "../_components/product-grid";
import { Link } from "next-view-transitions";

export default async function ProductsPage() {
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) return redirectToSignIn();

  const products = await getProducts(userId);

  if (products.length === 0) return <EmptyProductPage />;

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold flex justify-between">
        Products
        <Button asChild>
          <Link href="/dashboard/products/new">
            <PlusIcon className="size-4 mr-2" /> New Product
          </Link>
        </Button>
      </h1>
      <ProductGrid products={products} />
    </>
  );
}
