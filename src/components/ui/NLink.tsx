import Link from "next/link";
import { ReactNode } from "react";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export default function NLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: ClassValue;
}) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "text-lg w-full",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
