import { Menu } from "lucide-react";

//Components
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavItems } from "./nav-items";

export const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Menu />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <div className="py-12">
            <NavItems />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
