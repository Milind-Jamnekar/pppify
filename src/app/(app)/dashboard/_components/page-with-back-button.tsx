import { Button } from "@/components/ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { ReactNode } from "react";

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
    <div className="grid grid-cols-[auto,1fr] gap-5 ">
      <Button size="icon" variant="outline" asChild>
        <Link href={backButtonHref}>
          <div className="sr-only">Back</div>
          <CaretLeftIcon className="size-8" />
        </Link>
      </Button>

      <h1 className="text-2xl font-semibold self-center">{pageTitle}</h1>
      <div className="col-start-1 col-span-2 md:col-start-2">{children}</div>
    </div>
  );
}

export default PageWithBackButton;
