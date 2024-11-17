import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getProduct,
  getProductCountryGroups,
  getProductCustomization,
} from "@/server/db/products";
import { canRemoveBranding } from "@/server/permission";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { CountryDiscountsForm } from "../../../_components/forms/country-discount";
import CustomizationForm from "../../../_components/forms/customization";
import { ProductDetailsForm } from "../../../_components/forms/product-details";
import PageWithBackButton from "../../../_components/page-with-back-button";

async function ProductEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  const id = (await params).productId;
  const tab = (await searchParams).tab;

  const product = await getProduct(userId, id);
  if (!product) notFound();

  return (
    <PageWithBackButton
      pageTitle="Edit product"
      backButtonHref="/dashboard/products"
    >
      <Tabs defaultValue={tab}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="countries">Country</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-5">
          <DetailsTab product={product} />
        </TabsContent>
        <TabsContent value="countries" className="mt-5">
          <CountryTab productId={product.id} userId={userId} />
        </TabsContent>
        <TabsContent value="customization" className="mt-5">
          <CustomizationTab productId={product.id} userId={userId} />
        </TabsContent>
      </Tabs>
    </PageWithBackButton>
  );
}

function DetailsTab({
  product,
}: {
  product: {
    id: string;
    name: string;
    url: string;
    description: string | null;
  };
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product details</CardTitle>
        <CardDescription>
          You can edit your product details here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductDetailsForm product={product} />
      </CardContent>
    </Card>
  );
}

async function CountryTab({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const countryGroups = await getProductCountryGroups({
    productId,
    userId,
  });

  return (
    <Card id={userId}>
      <CardHeader>
        <CardTitle className="text-xl">Country Discounts</CardTitle>
        <CardDescription>
          Leave the discount field blank if you do not want to display deals for
          any specific parity group.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CountryDiscountsForm
          productId={productId}
          countryGroups={countryGroups}
        />
      </CardContent>
    </Card>
  );
}

async function CustomizationTab({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const customization = await getProductCustomization(productId, userId);

  if (!customization) notFound();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product details</CardTitle>
        <CardDescription>
          You can edit your product details here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomizationForm
          canRemoveBranding={await canRemoveBranding(userId)}
          // canCustomizeBanner={await canCustomizeBanner(userId)}
          canCustomizeBanner={true}
          customization={customization}
        />
      </CardContent>
    </Card>
  );
}

export default ProductEditPage;
