import PromotionalCarousel from "@/components/home/promotionalCarousel";
import MenWomenCategory from "@/components/home/menWomenCategory";
import NewProducts from "@/components/home/newProducts";
import Link from "next/link";
import Image from "next/image";
// import { getPopularBrandProducts } from "@/lib/bigCommerce";
// import ProductGrid from "@/components/home/productGrid";
// import SingleItemCarousel from "@/components/carousel/singleItemCarousel";
// import ProductCard from "@/components/home/productCard";
import Blog from "@/components/home/blog";
import AboutUs from "@/components/home/aboutUs";
import Footer from "@/components/footer";

export default async function Home() {
  // const brands = await getPopularBrandProducts();
  return (
    <div>
      <div className="md:px-8 lg:px-[80px]">
        <PromotionalCarousel />
      </div>
      <div className="mt-4 px-4 md:px-8 lg:px-[80px]">
        <MenWomenCategory />
        <div className="mt-8">
          <NewProducts />
        </div>
        <div className="px-8 py-4 mt-12 lg:px-40 md:px-28 md:py-16 text-center bg-[#F9F9F9]">
          <div className="text-3xl font-bold text-[#202020]">
            Sustainability
          </div>
          <div className="mt-5 text-[#202020]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum
            mattis placerat aenean pharetra ante pretium. Suspendisse ultrices
            hac quis odio varius sapien amet. Dui neque, adipiscing aliquet
            dictum cursus. Et magna tellus, amet est semper arcu, id viverra
            nibh. Nunc tortor odio tristique tristique eu in sed adipiscing
            quisque.
          </div>
          <div className="mt-5">
            <Link href="..." className="w-full text-blue-700 underline">
              Learn More
            </Link>
          </div>
        </div>
        <Image
          src="/images/home/sustainability.png"
          alt="..."
          width={1920}
          height={1080}
          className="object-cover w-full md:h-[400px] h-[240px]"
        />
        {/* {brands.length >= 1 && (
          <div className="flex flex-col md:flex-row mt-10 gap-8">
            <div className="flex flex-col flex-1 gap-4">
              <Image
                src="/images/home/brand-1.png"
                alt="..."
                className="h-[360px] md:h-[648px] w-full object-cover"
                width={600}
                height={648}
              />
              <div className="font-bold text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <Link
                href="..."
                className="px-4 m-auto py-2 text-center md:m-0 w-fit rounded text-white bg-[#003459]"
              >
                Shop Brand
              </Link>
            </div>
            <div className="md:hidden w-full">
              <SingleItemCarousel slide={false}>
                {brands[0].products.slice(0, 5).map((product) => {
                  return (
                    <div
                      key={product.entityId}
                      className="flex items-center justify-center w-full"
                    >
                      <ProductCard product={product} />
                    </div>
                  );
                })}
              </SingleItemCarousel>
            </div>
            <div className="hidden justify-center md:flex md:flex-1">
              <ProductGrid products={brands[0].products} />
            </div>
          </div>
        )} */}
        <div className="px-8 border border-[#003459] py-4 mt-12 lg:px-40 md:px-28 md:py-16 text-center bg-[#F9F9F9]">
          <div className="text-3xl font-bold text-[#003459]">Lorem Ipsum</div>
          <div className="mt-5 text-[#202020]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum
            mattis placerat aenean pharetra ante pretium. Suspendisse ultrices
            hac quis odio varius sapien amet. Dui neque, adipiscing aliquet
            dictum cursus. Et magna tellus, amet est semper arcu, id viverra
            nibh. Nunc tortor odio tristique tristique eu in sed adipiscing
            quisque.
          </div>
          <div className="mt-5">
            <Link href="..." className="w-full text-blue-700 underline">
              Learn More
            </Link>
          </div>
        </div>
        {/* {brands.length >= 2 && (
          <div className="flex flex-col md:flex-row mt-10 gap-8">
            <div className="hidden justify-center md:flex md:flex-1">
              <ProductGrid products={brands[1].products} />
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <Image
                src="/images/home/brand-2.png"
                alt="..."
                className="h-[360px] md:h-[648px] w-full object-cover"
                width={600}
                height={648}
              />
              <div className="font-bold text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <Link
                href="..."
                className="px-4 m-auto py-2 text-center md:m-0 w-fit rounded text-white bg-[#003459]"
              >
                Shop Brand
              </Link>
            </div>
            <div className="md:hidden w-full">
              <SingleItemCarousel slide={false}>
                {brands[1].products.slice(0, 5).map((product) => {
                  return (
                    <ProductCard key={product.entityId} product={product} />
                  );
                })}
              </SingleItemCarousel>
            </div>
          </div>
        )} */}
        <Blog />
      </div>
      <div className="md:px-8 lg:px-[80px]">
        <AboutUs />
      </div>
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
}
