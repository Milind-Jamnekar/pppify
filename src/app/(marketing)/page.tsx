// UI
import BrandLogo from "./_components/brand-logo";
import FooterGroup from "./_components/footer-group";
import { ClerkIcon, NeonIcon } from "./_components/icons";
import PricingCard from "./_components/pricing-card";
import { Hero } from "./_components/hero";

// constant
import { subscriptionTiersInOrder } from "../../data/subscriptionTiers";

// Lib
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero section  */}
      <Hero />

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
        <div className="container">
          <h2 className="text-4xl text-center text-balance font-semibold mb-8">
            Pricing software which pays for itself 20x over
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 max-w-screen-xl mx-auto ">
            {subscriptionTiersInOrder.map((tier) => (
              <PricingCard key={tier.name} {...tier} />
            ))}
          </div>
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
