"use client";

import { FooterLinks } from "@/lib/types";
import { plusIcon } from "../icons";
import { getFooterLinks } from "@/lib/bigCommerce";
import AccordionItem from "../accordionItem";
import { ReactNode } from "react";

const Grid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-1 gap-3.5">{children}</div>
  );
};

const FooterLinks = async ({ links }: { links: FooterLinks }) => {
  const ShopSection = () => {
    return (
      <Grid>
        {links.categoryTree.map((category, index: number) => {
          return <div key={index}>{category.name}</div>;
        })}
        <div>Homeware & Gifts</div>
        <div>Mens Sale</div>
        <div>Womens Sale</div>
      </Grid>
    );
  };

  const FeaturedSection = () => {
    return (
      <Grid>
        {links.featuredProducts.edges.map((product, index: number) => {
          return <div key={index}>{product.node.name}</div>;
        })}
      </Grid>
    );
  };

  const AboutUsSection = () => {
    return (
      <Grid>
        <div>Our Story</div>
        <div>Sustainability</div>
        <div>Customer Services</div>
        <div>Customer Reviews</div>
        <div>Atom Retro Shop</div>
        <div>Careers</div>
        <div>Mod Clothing Guide</div>
      </Grid>
    );
  };

  const HelpSection = () => {
    return (
      <Grid>
        <div>Contact</div>
        <div>Delivery</div>
        <div>Returns</div>
        <div>Tranking/Returns</div>
        <div>UK FAQ</div>
        <div>International FAQ</div>
        <div>Size Guide</div>
      </Grid>
    );
  };

  const FollowUsSection = () => {
    return (
      <Grid>
        {links.settings.socialMediaLinks.map((link, index: number) => {
          return <div key={index}>{link.name}</div>;
        })}
      </Grid>
    );
  };

  const LargeFooterLinks = () => {
    return (
      <div className="p-8 flex w-full text-base text-[#202020] justify-center gap-4">
        <div className="w-[200px]">
          <div className="text-black font-bold mb-4">Shop</div>
          <ShopSection />
        </div>
        <div className="w-[200px]">
          <div className="text-black font-bold mb-4">Featured</div>
          <FeaturedSection />
        </div>
        <div className="w-[200px]">
          <div className="text-black font-bold mb-4">About Us</div>
          <AboutUsSection />
        </div>
        <div className="w-[200px]">
          <div className="text-black font-bold mb-4">Help</div>
          <HelpSection />
        </div>
        <div className="w-[200px]">
          <div className="text-black font-bold">Follow Us</div>
          <FollowUsSection />
        </div>
      </div>
    );
  };

  const SmallFooterLinks = () => {
    return (
      <div className="p-4">
        <AccordionItem title="Shop" content={<ShopSection />} />
        <AccordionItem title="Featured" content={<FeaturedSection />} />
        <AccordionItem title="About Us" content={<AboutUsSection />} />
        <AccordionItem title="Help" content={<HelpSection />} />
        <AccordionItem title="Follow Us" content={<FollowUsSection />} />
      </div>
    );
  };

  return (
    <div className="bg-[#F8F8F9]">
      <div className="md:hidden">
        <SmallFooterLinks />
      </div>
      <div className="hidden md:block">
        <LargeFooterLinks />
      </div>
    </div>
  );
};

export default FooterLinks;
