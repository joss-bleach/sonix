import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Providers
import { ClerkProvider } from "@clerk/nextjs";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sonix",
  description: "Music events created and curated by the community.",
  icons: {
    icon: "/assets/SVG/sonix-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.variable}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
