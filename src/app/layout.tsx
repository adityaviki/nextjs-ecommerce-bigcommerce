import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopcart",
  description: "Best place to buy cloths for men and women",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#e5e5e5]`}>
        <div className="max-w-[1440px] pb-16 bg-white m-auto">
          <Header />
          <div className="px-4 md:px-8 lg:px-16">{children}</div>
        </div>
      </body>
    </html>
  );
}
