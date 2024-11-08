import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ReactNode } from "react";
import { ProductDetailsForm } from "../../_components/forms/product-details";

export default function NewProductPage() {
  return (
    <PageWithBackButton
      pageTitle="Create Product"
      backButtonHref="/dashboard/products"
    >
      {/* <HasPermission
        permission={canCreateProduct}
        renderFallback
        fallbackText="You have already created the maximum number of products. Try upgrading your account to create more."
      > */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductDetailsForm />
        </CardContent>
      </Card>
      {/* </HasPermission> */}
    </PageWithBackButton>
  );
}

function PageWithBackButton({
  pageTitle,
  backButtonHref,
  children,
}: {
  pageTitle: string;
  backButtonHref: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-3">
      <Button size="icon" variant="outline" className="rounded-full" asChild>
        <Link href={backButtonHref}>
          <div className="sr-only">Back</div>
          <CaretLeftIcon className="size-8" />
        </Link>
      </Button>

      <h1 className="text-2xl font-semibold self-center">{pageTitle}</h1>
      <div className="col-start-2">{children}</div>
    </div>
  );
}
