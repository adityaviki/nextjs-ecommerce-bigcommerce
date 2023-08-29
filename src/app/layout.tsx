import "@/styles/globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";
import GlobalProvider from "@/context/globalProvider";
import { Red_Hat_Display } from "next/font/google";
import ErrorMsg from "@/components/error";

const redHatDisplay = Red_Hat_Display({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopcart",
  description: "Best place to buy cloths for men and women",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className} bg-[#e5e5e5]`}>
        <div className="max-w-[1440px] text-base text-[#202020] bg-white m-auto">
          <GlobalProvider>
            <ErrorMsg />
            <div className="fixed max-w-[1440px] top-0 left-auto border-b z-10 w-full bg-white">
              <Header />
            </div>
            <div className="mt-[92px]  md:mt-[160px]">{children}</div>
          </GlobalProvider>
        </div>
      </body>
    </html>
  );
}
