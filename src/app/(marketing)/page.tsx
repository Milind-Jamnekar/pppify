// UI
import { Button, buttonVariants } from "@/components/ui/button";
import BrandLogo from "./_components/brand-logo";
import FooterGroup from "./_components/footer-group";
import { ClerkIcon, NeonIcon } from "./_components/icons";
import PricingCard from "./_components/pricing-card";

// constant
import { subscriptionTiersInOrder } from "../../data/subscriptionTiers";

// Lib
import { cn } from "@/lib/utils";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/nextjs";
import { ArrowRightCircle, Loader } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero section  */}
      <section className="min-h-[calc(100vh-70px)] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops)_60%)] dark:from-red-900 from-red-100 dark:via-yellow-950 via-yellow-100 to-bg-primary flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">
          Price smarter, Sell bigger!
        </h1>
        <p className="texy-lg lg:text-3xl text-muted-foreground dark:text-gray-300 max-w-screen-xl">
          Optimize your product pricing across countries to maximize sales.
          Capture 85% of the untapped market with location-based dynamic pricing
        </p>
        <ClerkLoading>
          <Button size="lg" className="text-lg" disabled>
            Please Wait
            <Loader className="mr-2 h-4 w-4 animate-spin transition" />
          </Button>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignUpButton>
              <Button size="lg" className="text-lg ">
                Get started for free
                <ArrowRightCircle />
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Link
              className={cn(buttonVariants({ size: "lg" }), "text-lg")}
              href="/dashboard"
            >
              Dashboard
            </Link>
            <p className="text-muted-foreground">
              You are already logged in 🎉, go to the dashboard
            </p>
          </SignedIn>
        </ClerkLoaded>
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

      {/* Priciing section  */}
      <section id="pricing" className="py-32 bg-accent/5">
        <h2 className="text-4xl text-center text-balance font-semibold mb-8">
          Pricing software which pays for itself 20x over
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
          {subscriptionTiersInOrder.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>

      {/* Footer section  */}
      <footer className="container pt-16 pb-8 flex flex-col sm:flex-row gap-8 sm:gap-4 justify-between items-start">
        <Link href="/">
          <BrandLogo />
        </Link>
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col gap-8">
            <FooterGroup
              title="Help"
              links={[
                { label: "PPP Discounts", href: "#" },
                { label: "Discount API", href: "#" },
              ]}
            />
            <FooterGroup
              title="Solutions"
              links={[
                { label: "Newsletter", href: "#" },
                { label: "SaaS Business", href: "#" },
                { label: "Online Courses", href: "#" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-8">
            <FooterGroup
              title="Features"
              links={[{ label: "PPP Discounts", href: "#" }]}
            />
            <FooterGroup
              title="Tools"
              links={[
                { label: "Salary Converter", href: "#" },
                { label: "Coupon Generator", href: "#" },
                { label: "Stripe App", href: "#" },
              ]}
            />
            <FooterGroup
              title="Company"
              links={[
                { label: "Affiliate", href: "#" },
                { label: "Twitter", href: "#" },
                { label: "Terms of Service", href: "#" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-8">
            <FooterGroup
              title="Integrations"
              links={[
                { label: "Lemon Squeezy", href: "#" },
                { label: "Gumroad", href: "#" },
                { label: "Stripe", href: "#" },
                { label: "Chargebee", href: "#" },
                { label: "Paddle", href: "#" },
              ]}
            />
            <FooterGroup
              title="Tutorials"
              links={[
                { label: "Any Website", href: "#" },
                { label: "Lemon Squeezy", href: "#" },
                { label: "Gumroad", href: "#" },
                { label: "Stripe", href: "#" },
                { label: "Chargebee", href: "#" },
                { label: "Paddle", href: "#" },
              ]}
            />
          </div>
        </div>
      </footer>
    </>
  );
}
