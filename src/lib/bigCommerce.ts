import config from "@/config/config";
import path from "path";

const headers = {
  "X-Auth-Token": config.bigCommerceAccessToken,
  "Content-Type": "application/json",
  Accept: "application/json",
  cache: "no-store",
};

async function bigCommerceFetch(url: string) {
  const completeUrl = path.join(config.bigCommerceApiPrefix, url);
  const res = await fetch(completeUrl, {
    headers: headers,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function getTopCategories() {
  try {
    const result = await bigCommerceFetch(
      "/v3/catalog/categories?is_visible=true&parent_id=0&limit=2"
    );

    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPageBanners(page: string) {
  const result = await bigCommerceFetch("v2/banners");

  const currentDateTimestamp = Date.now() / 1000;

  const filteredBanners = result.filter((banner: any) => {
    const isVisible = banner.visible === "1";
    const isCustomDateType = banner.date_type === "custom";
    const isOnPage = banner.page === page;
    const isInDateRange =
      isCustomDateType &&
      +banner.date_from <= currentDateTimestamp &&
      +banner.date_to >= currentDateTimestamp;

    return isVisible && isOnPage && (!isCustomDateType || isInDateRange);
  });

  return filteredBanners;
}

export async function getNewProducts() {
  try {
    const result = await bigCommerceFetch(
      "/v3/catalog/products?is_visible=true&limit=1&sort=id"
    );

    const newProducts = await Promise.all(
      result.data.map(async (product: any) => {
        try {
          let response = await bigCommerceFetch(
            `/v3/catalog/products/${product.id}/images?limit=2`
          );

          const images = response.data.map((image: any) => {
            return { id: image.id, url_standard: image.url_standard };
          });

          response = await bigCommerceFetch(
            `/v3/catalog/products/${product.id}/variants?limit=35`
          );

          const variants = new Map();
          const sizes = new Set();

          response.data.forEach((variant: any) => {
            let color = "";
            let size = "";

            variant.option_values.map((option: any) => {
              if (option.option_display_name === "Color") {
                color = option.label;
              }
              if (option.option_display_name === "Size") {
                size = option.label;
              }
            });

            if (!color && !size) {
              return;
            }

            if (!color && size) {
              sizes.add(size);
            }

            if (!variants.has(color)) {
              variants.set(color, {});
            }

            if (!variants.get(color).sizes) {
              variants.get(color).sizes = [];
            }

            variants.get(color).id = variant.id;
            variants.get(color).price = variant.price;
            variants.get(color).image_url = variant.image_url;
            variants.get(color).sizes.push(size);
          });

          let brand = "";

          if (product.brand_id) {
            response = await bigCommerceFetch(
              `/v3/catalog/brands/${product.brand_id}`
            );
            brand = response.data.name ? response.data.name : "";
          }

          const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            images: images,
            variants: variants,
            brand: brand,
          };

          return data;
        } catch (error) {
          console.log(error);
        }
      })
    );

    return newProducts;
  } catch (error) {
    console.log(error);
  }
}

export async function getMenWomenCategory() {
  try {
    const mensCategory = await bigCommerceFetch(
      `/v3/catalog/categories?name=men's`
    );
    const womensCategory = await bigCommerceFetch(
      `/v3/catalog/categories?name=women's`
    );

    return [
      mensCategory.data.length ? mensCategory.data[0] : {},
      womensCategory.data.length ? womensCategory.data[0] : {},
    ];
  } catch (error) {
    console.log(error);
  }
}
