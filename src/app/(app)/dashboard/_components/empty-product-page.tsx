import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

function EmptyProductPage() {
  return (
    <div className="max-w-xl mx-auto mt-32 md:mt-40">
      <Card className=" text-center text-balance">
        <CardHeader>
          <CardTitle className="text-4xl font-semibold mb-2">
            You have no products
          </CardTitle>
          <CardDescription>
            Get started with PPP discounts by creating a product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" asChild>
            <Link href="/dashboard/products/new">Add Product</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmptyProductPage;
