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

export async function getNewArriavls() {
  try {
    const result = await bigCommerceFetch(
      "/v3/catalog/products?is_visible=true&limit=8&sort=id"
    );

    const newArrivals = await Promise.all(
      result.data.map(async (product: any) => {
        const images = await getProductImages(product.id);

        return { ...product, images: images.length ? images[0] : {} };
      })
    );

    return newArrivals;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductImages(id: number) {
  try {
    const result = await bigCommerceFetch(`/v3/catalog/products/${id}/images`);

    return result.data;
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
