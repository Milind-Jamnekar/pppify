import { Button } from "@/components/ui/button";
import { getProducts } from "@/server/db/products";
import { auth } from "@clerk/nextjs/server";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import EmptyProductPage from "./_components/empty-product-page";

async function DashboardPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  const products = await getProducts(userId, 5);

  if (products.length === 0) return <EmptyProductPage />;
  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold flex justify-between">
        <Link
          className="group flex gap-2 items-center hover:underline"
          href="/dashboard/products"
        >
          Products
          <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <PlusIcon className="size-4 mr-2" />
            New Product
          </Link>
        </Button>
      </h2>
      {/* <ProductGrid products={products} /> */}
      <h2 className="mb-6 text-3xl font-semibold flex justify-between mt-12">
        <Link
          href="/dashboard/analytics"
          className="flex gap-2 items-center hover:underline group"
        >
          Analytics
          <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </h2>
      {/* <HasPermission permission={canAccessAnalytics} renderFallback>
        <AnalyticsChart userId={userId} />
      </HasPermission> */}
    </>
  );
}

export default DashboardPage;
