import { BIGCOMMERCE_GRAPHQL_API_ENDPOINT } from "./constants";

import {
  BigCommerceBlogsOperation,
  BigCommerceCartItemsOperation,
  BigCommerceCategoryOperation,
  BigCommerceFooterLinksOperation,
  BigCommerceMenuItemsOperation,
  BigCommerceNewProductsOperation,
  BigCommercePopularBrandsOperation,
  BigCommerceProductsByBrandIdsOperation,
  BigCommerceProductsByIdsOperation,
  BigCommerceSearchProductsOperation,
  Blog,
  BrandProducts,
  Cart,
  Category,
  FooterLinks,
  FormattedProduct,
  MenuItems,
  PopularBrands,
  Product,
  SearchProduct,
} from "./types";

import {
  getBlogsQuery,
  getCartItemsQuery,
  getCategoryQuery,
  getFooterLinksQuery,
  getMenuItemsQuery,
  getNewProductsQuery,
  getPopularBrandsQuery,
  getProductsByBrandIdsQuery,
  getProductsByIdsQuery,
  getSearchProductsQuery,
  getSubcategoriesQuery,
} from "./queries";

const channelIdSegment =
  parseInt(process.env.BIGCOMMERCE_CHANNEL_ID!) !== 1
    ? `-${process.env.BIGCOMMERCE_CHANNEL_ID}`
    : "";
const domain = `https://store-${process.env
  .BIGCOMMERCE_STORE_HASH!}${channelIdSegment}`;
const endpoint = `${domain}.${BIGCOMMERCE_GRAPHQL_API_ENDPOINT}`;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function bigCommerceFetch<T>({
  query,
  variables,
  headers,
  cache = "no-cache",
}: {
  query: string;
  variables?: ExtractVariables<T>;
  headers?: HeadersInit;
  cache?: RequestCache;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN}`,
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    console.log(e);
    throw {
      error: e,
      query,
    };
  }
}

// export async function getHomePageBanners(): Promise<PageBanner[] | never> {
//   try {
//     const res = await bigCommerceFetch<BigCommerceHomePageBannersOperation>({
//       query: getHomePageBannersQuery,
//     });

//     const pageBanners = res.body.data.site.content.banners.homePage.edges.map(
//       (banner) => banner.node
//     );
//     return pageBanners;
//   } catch (e) {
//     console.log(e);
//     throw {
//       error: e,
//       query: getHomePageBannersQuery,
//     };
//   }
// }

export async function getMenWomenCategory(): Promise<Category[] | never> {
  try {
    const res = await bigCommerceFetch<BigCommerceCategoryOperation>({
      query: getCategoryQuery,
    });

    const menWomenCategory = res.body.data.site.categoryTree.filter(
      (category) => {
        return (
          category.name.toLocaleLowerCase() === "men's" ||
          category.name.toLocaleLowerCase() === "women's"
        );
      }
    );

    return menWomenCategory;
  } catch (e) {
    console.log(e);
    throw {
      error: e,
      query: getCategoryQuery,
    };
  }
}

export async function getNewProducts(): Promise<Product[] | never> {
  try {
    const res = await bigCommerceFetch<BigCommerceNewProductsOperation>({
      query: getNewProductsQuery,
    });

    const newProducts = res.body.data.site.newestProducts.edges.map(
      (product) => {
        return product.node;
      }
    );

    return newProducts;
  } catch (e) {
    console.log(e);
    throw {
      error: e,
      query: getNewProductsQuery,
    };
  }
}

// const getFormattedProduct = (product: Product): FormattedProduct => {
//   const variants = product.variants.edges.map((variant) => {
//     const options = variant.node.options.edges.map((option) => {
//       const values = option.node.values.edges.map((value) => {
//         return value.node.label;
//       });

//       return {
//         displayName: option.node.displayName,
//         value: values.length ? values[0] : "",
//       };
//     });

//     const color = options.find((option) => {
//       return option.displayName.toLocaleLowerCase() === "color";
//     });

//     const size = options.find((option) => {
//       return option.displayName.toLocaleLowerCase() === "size";
//     });

//     return {
//       entityId: variant.node.entityId,
//       defaultImage: variant.node.defaultImage?.urlOriginal || "",
//       price: variant.node.prices?.price.formatted || "",
//       color: color && color.value ? color.value : "",
//       size: size && size.value ? size.value.toLocaleLowerCase() : "",
//     };
//   });

//   return {
//     entityId: product.entityId,
//     name: product.name,
//     brand: product.brand?.name || "",
//     defaultImage: product.defaultImage?.urlOriginal || "",
//     alternateImage: product.images.edges[0]?.node.urlOriginal || "",
//     price: product.prices?.price.formatted || "",
//     variants: variants,
//   };
// };

// export async function getPopularBrandProducts(): Promise<
//   PopularBrands[] | never
// > {
//   try {
//     let res = await bigCommerceFetch<BigCommercePopularBrandsOperation>({
//       query: getPopularBrandsQuery,
//     });

//     const brandIds = res.body.data.site.popularBrands.edges.map((brand) => {
//       return brand.node.entityId;
//     });

//     const result =
//       await bigCommerceFetch<BigCommerceProductsByBrandIdsOperation>({
//         query: getProductsByBrandIdsQuery,
//         variables: {
//           brandIds: brandIds,
//         },
//       });

//     const brands = Promise.all(
//       result.body.data.site.brands.edges.map(async (brand) => {
//         const productsIds = brand.node.products.edges.map((product) => {
//           return product.node.entityId;
//         });

//         const res = await bigCommerceFetch<BigCommerceProductsByIdsOperation>({
//           query: getProductsByIdsQuery,
//           variables: {
//             productIds: productsIds,
//           },
//         });

//         const products = res.body.data.site.products.edges.map((product) => {
//           return getFormattedProduct(product.node);
//         });

//         return {
//           entityId: brand.node.entityId,
//           name: brand.node.name,
//           products: products,
//         };
//       })
//     );

//     return brands;
//   } catch (e) {
//     console.log(e);
//     throw {
//       error: e,
//       query: getProductsByBrandIdsQuery,
//     };
//   }
// }

export async function getSearchProducts(
  query: string
): Promise<SearchProduct[] | never> {
  try {
    const res = await bigCommerceFetch<BigCommerceSearchProductsOperation>({
      query: getSearchProductsQuery,
      variables: {
        filters: {
          searchTerm: query,
        },
      },
    });

    const products =
      res.body.data.site.search.searchProducts.products.edges.map((product) => {
        return {
          entityId: product.node.entityId,
          name: product.node.name,
          brand: product.node.brand.name,
          price: product.node.prices.price.formatted,
          image: product.node.defaultImage.urlOriginal,
        };
      });

    return products;
  } catch (e) {
    console.log(e);
    throw {
      error: e,
      query: getSearchProductsQuery,
    };
  }
}

export async function getCartItems(): Promise<any | never> {
  try {
    const res = await bigCommerceFetch<BigCommerceCartItemsOperation>({
      query: getCartItemsQuery,
      variables: {
        cartEntityId: process.env.BIGCOMMERCE_TEST_CART_ENTITY_ID || "",
      },
    });

    const cart = res.body.data.site.cart;

    const physicalItems = cart.lineItems.physicalItems.map((item) => {
      const color = item.selectedOptions.find((option) => {
        return option.name.toLocaleLowerCase() === "color";
      });

      const size = item.selectedOptions.find((option) => {
        return option.name.toLocaleLowerCase() === "size";
      });

      return {
        entityId: item.entityId,
        productId: item.productEntityId,
        variantId: item.variantEntityId,
        name: item.name,
        quantity: item.quantity,
        price: item.originalPrice.value,
        imageUrl: item.imageUrl,
        color: color ? color.value : "",
        size: size ? size.value : "",
      };
    });

    return {
      entityId: cart.entityId,
      currencyCode: cart.currencyCode,
      amount: cart.amount.value,
      totalQuantity: cart.lineItems.totalQuantity,
      physicalItems: physicalItems,
    };
  } catch (e) {
    console.log(e);
    throw {
      error: e,
      query: getCartItemsQuery,
    };
  }
}

export async function getBlogs(): Promise<Blog[] | never> {
  try {
    const res = await bigCommerceFetch<BigCommerceBlogsOperation>({
      query: getBlogsQuery,
    });

    const blogs = res.body.data.site.content.blog.posts.edges.map((blog) => {
      return blog.node;
    });

    return blogs;
  } catch (e) {
    console.log(e);
    throw {
      error: e,
      query: getBlogsQuery,
    };
  }
}

export async function getFooterLinks(): Promise<FooterLinks | never> {
  try {
    const res = await bigCommerceFetch<BigCommerceFooterLinksOperation>({
      query: getFooterLinksQuery,
    });

    const result = res.body.data.site;
    return result;
  } catch (e) {
    console.log(e);
    throw {
      error: e,
      query: getBlogsQuery,
    };
  }
}

export async function getMenuItems(): Promise<MenuItems | never> {
  try {
    const res = await bigCommerceFetch<BigCommerceMenuItemsOperation>({
      query: getMenuItemsQuery,
    });

    const brands = res.body.data.site.brands.edges.map((brand) => {
      return brand.node;
    });

    const mensCategories = res.body.data.site.categoryTree.filter(
      (category) => {
        return category.name.toLocaleLowerCase() === "men's";
      }
    );

    const womensCategories = res.body.data.site.categoryTree.filter(
      (category) => {
        return category.name.toLocaleLowerCase() === "women's";
      }
    );

    const result = {
      brands: brands,
      mensCategories: mensCategories.length ? mensCategories[0].children : [],
      womensCategories: womensCategories.length
        ? womensCategories[0].children
        : [],
    };

    return result;
  } catch (e) {
    console.log(e);
    throw {
      error: e,
      query: getBlogsQuery,
    };
  }
}

// export async function getPageBanners(page: string) {
//   const result = await bigCommerceFetch("v2/banners");

//   const currentDateTimestamp = Date.now() / 1000;

//   const filteredBanners = result.filter((banner: any) => {
//     const isVisible = banner.visible === "1";
//     const isCustomDateType = banner.date_type === "custom";
//     const isOnPage = banner.page === page;
//     const isInDateRange =
//       isCustomDateType &&
//       +banner.date_from <= currentDateTimestamp &&
//       +banner.date_to >= currentDateTimestamp;

//     return isVisible && isOnPage && (!isCustomDateType || isInDateRange);
//   });

//   return filteredBanners;
// }

// export async function getNewProducts() {
//   try {
//     const result = await bigCommerceFetch(
//       "/v3/catalog/products?is_visible=true&limit=1&sort=id"
//     );

//     const newProducts = await Promise.all(
//       result.data.map(async (product: any) => {
//         try {
//           let response = await bigCommerceFetch(
//             `/v3/catalog/products/${product.id}/images?limit=2`
//           );

//           const images = response.data.map((image: any) => {
//             return { id: image.id, url_standard: image.url_standard };
//           });

//           response = await bigCommerceFetch(
//             `/v3/catalog/products/${product.id}/variants?limit=35`
//           );

//           const variants = new Map();
//           const sizes = new Set();

//           response.data.forEach((variant: any) => {
//             let color = "";
//             let size = "";

//             variant.option_values.map((option: any) => {
//               if (option.option_display_name === "Color") {
//                 color = option.label;
//               }
//               if (option.option_display_name === "Size") {
//                 size = option.label;
//               }
//             });

//             if (!color && !size) {
//               return;
//             }

//             if (!color && size) {
//               sizes.add(size);
//             }

//             if (!variants.has(color)) {
//               variants.set(color, {});
//             }

//             if (!variants.get(color).sizes) {
//               variants.get(color).sizes = [];
//             }

//             variants.get(color).id = variant.id;
//             variants.get(color).price = variant.price;
//             variants.get(color).image_url = variant.image_url;
//             variants.get(color).sizes.push(size);
//           });

//           let brand = "";

//           if (product.brand_id) {
//             response = await bigCommerceFetch(
//               `/v3/catalog/brands/${product.brand_id}`
//             );
//             brand = response.data.name ? response.data.name : "";
//           }

//           const data = {
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             images: images,
//             variants: variants,
//             brand: brand,
//           };

//           return data;
//         } catch (error) {
//           console.log(error);
//         }
//       })
//     );

//     return newProducts;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getMenWomenCategory() {
//   try {
//     const mensCategory = await bigCommerceFetch(
//       `/v3/catalog/categories?name=men's`
//     );
//     const womensCategory = await bigCommerceFetch(
//       `/v3/catalog/categories?name=women's`
//     );

//     return [
//       mensCategory.data.length ? mensCategory.data[0] : {},
//       womensCategory.data.length ? womensCategory.data[0] : {},
//     ];
//   } catch (error) {
//     console.log(error);
//   }
// }
