import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { ClerkIcon, NeonIcon } from "./_components/icons";

export default function Home() {
  return (
    <>
      {/* Hero section  */}
      <section className="min-h-dvh bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops)_60%)] dark:from-red-900 from-red-100 dark:via-yellow-950 via-yellow-100 to-bg-primary flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">
          Price smarter, Sell bigger!
        </h1>
        <p className="texy-lg lg:text-3xl text-gray-600 dark:text-gray-300 max-w-screen-xl">
          Optimize your product pricing across countries to maximize sales.
          Capture 85% of the untapped market with location-based dynamic pricing
        </p>
        <SignUpButton>
          <Button size="lg" className="text-lg ">
            Get started for free
            <ArrowRightCircle />
          </Button>
        </SignUpButton>
      </section>

      {/* Brand section  */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 flex flex-col gap-16 px-8 md:px-16">
          <h2 className=" text-2xl text-balance text-center ">
            Trusted by top modern companies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-16">
            <Link href="#">
              <ClerkIcon />
            </Link>
            <Link href="#">
              <NeonIcon />
            </Link>
            <Link href="#">
              <ClerkIcon />
            </Link>
            <Link href="#">
              <NeonIcon />
            </Link>
            <Link href="#">
              <ClerkIcon />
            </Link>

            <Link href="#">
              <NeonIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
