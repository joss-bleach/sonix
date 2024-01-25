import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// Components
import { Button } from "@/components/ui/button";
import { NavItems } from "@/components/shared/nav-items";
import { MobileNav } from "@/components/shared/mobile-nav";

export const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex w-36 items-center justify-between">
        <Link href="/">
          <Image
            src="/assets/SVG/sonix-logo.svg"
            alt="Sonix logo"
            width={38}
            height={38}
          />
        </Link>
        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>
        <div className="flex w-36 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};
