import BrandLogo from "@/app/(marketing)/_components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import NLink from "@/components/ui/NLink";
import ThemeChanger from "@/components/ui/theme-changer";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Navbar() {
  return (
    <header className="container pt-8">
      <nav>
        <Card className="flex items-center gap-10 container font-semibold rounded-full backdrop-blur-xl bg-background/60">
          <CardHeader className="flex items-center flex-row justify-between space-y-0 px-0 py-4 w-full">
            <Link href="/" className="">
              <BrandLogo />
            </Link>
            {/* <MobileDrawer /> */}
            <div className="hidden md:flex gap-2 items-center ">
              <NLink href="#">Products</NLink>
              <NLink href="#">Analytics</NLink>
              <NLink href="#">Subscription</NLink>
              {/* <LoginOrLogoutButton /> */}
            </div>
            <div className="flex items-center gap-3">
              <ThemeChanger />
              <Button size="icon" asChild>
                <UserButton />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </nav>
    </header>
  );
}
export default Navbar;
