import FooterLinks from "./footerLinks";
import NewsLetter from "./newsLetter";
import Review from "./review";
import Image from "next/image";
import { dividerIcon } from "../icons";
import { getFooterLinks } from "@/lib/bigCommerce";

const Footer = async () => {
  const footerLinks = await getFooterLinks();
  return (
    <div>
      <Review />
      <div className="mt-4">
        <FooterLinks links={footerLinks} />
      </div>
      <NewsLetter />
      <div className="flex flex-col p-4 gap-4 md:items-center md:justify-center bg-[#F9F9F9]">
        <div className="grid grid-cols-2 gap-4 text-base md:flex">
          <div>Terms and conditions</div>
          <div className="hidden md:block">{dividerIcon}</div>
          <div>Product Archive</div>
          <div className="hidden md:block">{dividerIcon}</div>
          <div>Privacy Policy</div>
          <div className="hidden md:block">{dividerIcon}</div>
          <div>Site Map</div>
          <div className="hidden md:block">{dividerIcon}</div>
          <div>Cookies</div>
        </div>
        <Image
          height={30}
          width={310}
          alt="..."
          src="/images/home/payments.png"
        />
        <div className="flex flex-col gap-4 md:flex-row md:gap-20">
          <div>© Indie Apparel Ltd 2004 - 2021 | All rights reserved</div>
          <div className="underline">Ecommerce by Calashock</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
