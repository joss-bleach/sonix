import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const date = new Date();
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/SVG/sonix-logo.svg"
            alt="Sonix logo"
            width={38}
            height={38}
          />
        </Link>
        <p>&copy; Sonix {date.getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
};
