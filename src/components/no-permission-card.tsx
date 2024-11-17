import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ReactNode } from "react";

export function NoPermissionCard({
  children = "This features are available for standard and premium only. Try upgrading your account to access this feature.",
}: {
  children?: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Premium Features</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{children}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="/dashboard/subscription">Upgrade Account</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
