import { Globe2Icon } from "lucide-react";

export default function BrandLogo() {
  return (
    <span className="flex items-center justify-center gap-2 flex-shrink-0 mr-auto text-lg bg-background/90">
      <span className="sr-only">PPPify logo</span>
      <Globe2Icon className="size-8" />
      <span>PPPify</span>
    </span>
  );
}
