"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Hooks
import { usePathname } from "next/navigation";

export const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => (
        <li
          key={link.label}
          className={cn(
            pathname === link.route && "text-primary-500",
            "p-medium-16 whitespace-nowrap text-center",
          )}
        >
          <Link href={link.route}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};
