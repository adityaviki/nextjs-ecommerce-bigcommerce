import { BIGCOMMERCE_GRAPHQL_API_ENDPOINT } from "./constants";

import {
  BigComemrceHomePageBannerOperation,
  BigCommerceAddCartLineItemOperation,
  BigCommerceBlogsOperation,
  BigCommerceCart,
  BigCommerceCartItemsOperation,
  BigCommerceCreateCartOperation,
  BigCommerceCurrenciesOperation,
  BigCommerceDeleteCartLineItemOperation,
  BigCommerceFooterLinksOperation,
  BigCommerceMenuItemsOperation,
  BigCommerceNewProductsOperation,
  BigCommercePopularBrandsOperation,
  BigCommerceProductsByBrandIdsOperation,
  BigCommerceProductsByIdsOperation,
  BigCommerceSearchProductsOperation,
  BigCommerceStoreNameOperation,
  BigCommerceUpdateCartLineItemOperation,
  Blog,
  CartItem,
  Currency,
  FooterLinks,
  MenuItems,
  PopularBrands,
  Product,
} from "./types";

import {
  getBlogsQuery,
  getCartItemsQuery,
  getCurrenciesQuery,
  getFooterLinksQuery,
  getHomePageBannersQuery,
  getMenuItemsQuery,
  getNewProductsQuery,
  getPopularBrandsQuery,
  getProductsByBrandIdsQuery,
  getProductsByIdsQuery,
  getSearchProductsQuery,
  getStoreNameQuery,
} from "./queries";

import {
  addCartLineItemMutation,
  createCartMutation,
  deleteCartLineItemMutation,
  updateCartLineItemMutation,
} from "./mutations";

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
    throw {
      error: e,
      query,
    };
  }
}

export async function getNewProducts(): Promise<Product[] | never> {
  const res = await bigCommerceFetch<BigCommerceNewProductsOperation>({
    query: getNewProductsQuery,
  });

  const newProducts = res.body.data.site.newestProducts.edges.map((product) => {
    return product.node;
  });

  return newProducts;
}

export async function getPopularBrandProducts(): Promise<
  PopularBrands[] | never
> {
  let res = await bigCommerceFetch<BigCommercePopularBrandsOperation>({
    query: getPopularBrandsQuery,
  });

  const brandIds = res.body.data.site.popularBrands.edges.map((brand) => {
    return brand.node.entityId;
  });

  const result = await bigCommerceFetch<BigCommerceProductsByBrandIdsOperation>(
    {
      query: getProductsByBrandIdsQuery,
      variables: {
        brandIds: brandIds,
      },
    }
  );

  const brands = Promise.all(
    result.body.data.site.brands.edges.map(async (brand) => {
      const productsIds = brand.node.products.edges.map((product) => {
        return product.node.entityId;
      });

      const res = await bigCommerceFetch<BigCommerceProductsByIdsOperation>({
        query: getProductsByIdsQuery,
        variables: {
          productIds: productsIds,
        },
      });

      const products = res.body.data.site.products.edges.map((product) => {
        return product.node;
      });

      return {
        entityId: brand.node.entityId,
        name: brand.node.name,
        products: products,
      };
    })
  );
  return brands;
}

export async function deleteCartItem(
  cartEntityId: string,
  lineItemEntityId: string
): Promise<BigCommerceCart | never> {
  const res = await bigCommerceFetch<BigCommerceDeleteCartLineItemOperation>({
    query: deleteCartLineItemMutation,
    variables: {
      lineItemInput: {
        cartEntityId: cartEntityId,
        lineItemEntityId: lineItemEntityId,
      },
    },
  });

  return res.body.data.cart.deleteCartLineItem.cart;
}

export async function updateCartItem(
  cartEntityId: string,
  lineItemEntityId: string,
  lineItem: CartItem
): Promise<BigCommerceCart | never> {
  const res = await bigCommerceFetch<BigCommerceUpdateCartLineItemOperation>({
    query: updateCartLineItemMutation,
    variables: {
      lineItemInput: {
        cartEntityId: cartEntityId,
        lineItemEntityId: lineItemEntityId,
        data: {
          lineItem: lineItem,
        },
      },
    },
  });

  return res.body.data.cart.updateCartLineItem.cart;
}

export async function addToCart(
  cartId: string,
  cartItem: CartItem
): Promise<string | never> {
  if (cartId) {
    const res = await bigCommerceFetch<BigCommerceAddCartLineItemOperation>({
      query: addCartLineItemMutation,
      variables: {
        lineItemInput: {
          cartEntityId: cartId,
          data: {
            lineItems: [cartItem],
          },
        },
      },
    });
    return res.body.data.cart.createCart.cart.entityId;
  } else {
    const res = await bigCommerceFetch<BigCommerceCreateCartOperation>({
      query: createCartMutation,
      variables: {
        lineItemInput: {
          lineItems: [cartItem],
        },
      },
    });
    return res.body.data.cart.createCart.cart.entityId;
  }
}

export async function getProductsByQuery(
  query: string
): Promise<Product[] | never> {
  const res = await bigCommerceFetch<BigCommerceSearchProductsOperation>({
    query: getSearchProductsQuery,
    variables: {
      filters: {
        searchTerm: query,
      },
    },
  });

  const products = res.body.data.site.search.searchProducts.products.edges.map(
    (product) => product.node
  );

  return products;
}

export async function getCartItems(
  cartEntityId: string
): Promise<BigCommerceCart | never> {
  const res = await bigCommerceFetch<BigCommerceCartItemsOperation>({
    query: getCartItemsQuery,
    variables: {
      cartEntityId: cartEntityId,
    },
  });

  return res.body.data.site.cart;
}

export async function getBlogs(): Promise<Blog[] | never> {
  const res = await bigCommerceFetch<BigCommerceBlogsOperation>({
    query: getBlogsQuery,
  });

  const blogs = res.body.data.site.content.blog.posts.edges.map((blog) => {
    return blog.node;
  });

  return blogs;
}

export async function getFooterLinks(): Promise<FooterLinks | never> {
  const res = await bigCommerceFetch<BigCommerceFooterLinksOperation>({
    query: getFooterLinksQuery,
  });

  const result = res.body.data.site;
  return result;
}

export async function getMenuItems(): Promise<MenuItems | never> {
  const res = await bigCommerceFetch<BigCommerceMenuItemsOperation>({
    query: getMenuItemsQuery,
  });

  const brands = res.body.data.site.brands.edges.map((brand) => {
    return brand.node;
  });

  const mensCategories = res.body.data.site.categoryTree.filter((category) => {
    return category.name.toLocaleLowerCase() === "men's";
  });

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
}

export async function getCurrencies(): Promise<Currency[] | never> {
  const res = await bigCommerceFetch<BigCommerceCurrenciesOperation>({
    query: getCurrenciesQuery,
  });

  const currencies = res.body.data.site.currencies.edges.map((currency) => {
    return currency.node;
  });

  return currencies;
}

export async function getStoreName(): Promise<string | never> {
  const res = await bigCommerceFetch<BigCommerceStoreNameOperation>({
    query: getStoreNameQuery,
  });

  const storeName = res.body.data.site.settings.storeName;
  return storeName;
}

export async function getHomePageBanners(): Promise<string[] | never> {
  const res = await bigCommerceFetch<BigComemrceHomePageBannerOperation>({
    query: getHomePageBannersQuery,
  });

  const banners = res.body.data.site.content.banners.homePage.edges.map(
    (banner) => {
      return banner.node.content;
    }
  );

  return banners;
}
