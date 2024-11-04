"use client";
import NLink from "@/components/ui/NLink";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ThemeChanger from "@/components/ui/theme-changer";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { ReloadIcon } from "@radix-ui/react-icons";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BrandLogo from "./brand-logo";

export default function Navbar() {
  return (
    <header className="mt-6 container">
      <nav>
        <Card className="flex items-center gap-10 container font-semibold rounded-full backdrop-blur-xl bg-background/60">
          <CardHeader className="flex items-center flex-row justify-between space-y-0 px-0 py-4 w-full">
            <Link href="/" className="">
              <BrandLogo />
            </Link>
            <MobileDrawer />
            <div className="hidden md:flex gap-2 items-center ">
              <NLink href="#">Features</NLink>
              <NLink href="#">Pricing</NLink>
              <NLink href="#">About</NLink>
              <LoginOrLogoutButton />
              <ThemeChanger />
            </div>
          </CardHeader>
        </Card>
      </nav>
    </header>
  );
}

function LoginOrLogoutButton() {
  return (
    <>
      <ClerkLoading>
        <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin transition" />
        </Button>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <NLink href="dashboard">Dashboard</NLink>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button className="font-semibold">Get started</Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon className="size-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left px-5">
            <DrawerTitle className="sr-only">Menu</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-5 items-start px-4">
            <NLink className="w-full " href="#">
              Features
            </NLink>
            <NLink href="#">Pricing</NLink>
            <NLink href="#">About</NLink>
          </div>
          <DrawerFooter className="pt-2">
            <LoginOrLogoutButton />
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
}
