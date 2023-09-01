export type notification = {
  message: string;
  cb?: () => void;
};

export type UserPreference = {
  countryCode: string;
  currencyCode: string;
};

export type ShippingLocationProps = {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  flag: string;
  symbol: string;
};

export type CartPhysicalItem = {
  entityId: string;
  productEntityId: number;
  variantEntityId: number;
  name: string;
  brand: string;
  imageUrl: string;
  quantity: number;
  originalPrice: {
    value: number;
  };
  selectedOptions: Array<{
    entityId: number;
    name: string;
    value: string;
    valueEntityId: number;
  }>;
};

export type LineItem = {
  totalQuantity: number;
  physicalItems: CartPhysicalItem[];
};

export type BigCommerceCart = {
  entityId: string;
  currencyCode: string;
  amount: {
    value: number;
  };
  lineItems: LineItem;
};

export type CartItem = {
  quantity: number;
  productEntityId: number;
  variantEntityId: number;
  selectedOptions: {
    multipleChoices: Array<{
      optionEntityId: number;
      optionValueEntityId: number;
    }>;
  };
};

export type BigCommerceStoreNameOperation = {
  data: {
    site: {
      settings: {
        storeName: string;
      };
    };
  };
};

export type BigCommerceCreateCartOperation = {
  data: {
    cart: {
      createCart: {
        cart: BigCommerceCart;
      };
    };
  };
  variables: {
    lineItemInput: {
      lineItems: CartItem[];
    };
  };
};

export type BigCommerceAddCartLineItemOperation = {
  data: {
    cart: {
      createCart: {
        cart: {
          entityId: string;
        };
      };
    };
  };
  variables: {
    lineItemInput: {
      cartEntityId: string;
      data: {
        lineItems: CartItem[];
      };
    };
  };
};

export type BigCommerceDeleteCartLineItemOperation = {
  data: {
    cart: {
      deleteCartLineItem: {
        cart: BigCommerceCart;
      };
    };
  };
  variables: {
    lineItemInput: {
      cartEntityId: string;
      lineItemEntityId: string;
    };
  };
};

export type BigCommerceUpdateCartLineItemOperation = {
  data: {
    cart: {
      updateCartLineItem: {
        cart: BigCommerceCart;
      };
    };
  };
  variables: {
    lineItemInput: {
      cartEntityId: string;
      lineItemEntityId: string;
      data: {
        lineItem: CartItem;
      };
    };
  };
};

export type BigCommerceCartItemsOperation = {
  data: {
    site: {
      cart: BigCommerceCart;
    };
  };
  variables: {
    cartEntityId: string;
  };
};

export type Currency = {
  code: string;
  exchangeRate: number;
  name: string;
  isActive: boolean;
  isTransactional: boolean;
  display: {
    symbol: string;
  };
};

export type BigCommerceCurrenciesOperation = {
  data: {
    site: {
      currencies: {
        edges: Array<{
          node: Currency;
        }>;
      };
    };
  };
};

export type BigCommerceSearchProductsOperation = {
  data: {
    site: {
      search: {
        searchProducts: {
          products: {
            edges: Array<{
              node: Product;
            }>;
          };
        };
      };
    };
  };
  variables: {
    filters: {
      searchTerm: string;
    };
  };
};

export type PopularBrands = {
  entityId: number;
  name: string;
  products: Product[];
};

export type Product = {
  entityId: number;
  name: string;
  brand: {
    name: string;
  };
  defaultImage: {
    urlOriginal: string;
  };
  images: {
    edges: Array<{
      node: {
        urlOriginal: string;
      };
    }>;
  };
  prices: {
    price: {
      currencyCode: string;
      value: number;
      formatted: string;
    };
  };
  productOptions: {
    edges: Array<{
      node: {
        entityId: number;
        displayName: string;
        values: {
          edges: Array<{
            node: {
              entityId: number;
              label: string;
            };
          }>;
        };
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        isPurchasable: boolean;
        entityId: number;
        defaultImage: {
          urlOriginal: string;
        };
        prices: {
          price: {
            formatted: string;
          };
        };
        options: {
          edges: Array<{
            node: {
              entityId: number;
              displayName: string;
              values: {
                edges: Array<{
                  node: {
                    entityId: number;
                    label: string;
                  };
                }>;
              };
            };
          }>;
        };
      };
    }>;
  };
};

export type BigCommerceNewProductsOperation = {
  data: {
    site: {
      newestProducts: {
        edges: Array<{
          node: Product;
        }>;
      };
    };
  };
};

export type BigComemrceHomePageBannerOperation = {
  data: {
    site: {
      content: {
        banners: {
          homePage: {
            edges: Array<{
              node: {
                content: string;
              };
            }>;
          };
        };
      };
    };
  };
};

export type BigCommercePopularBrandsOperation = {
  data: {
    site: {
      popularBrands: {
        edges: Array<{
          node: {
            entityId: number;
          };
        }>;
      };
    };
  };
};

export type BrandProducts = {
  entityId: number;
  name: string;
  products: Product[];
};

export type BigCommerceProductsByIdsOperation = {
  data: {
    site: {
      products: {
        edges: Array<{
          node: Product;
        }>;
      };
    };
  };
  variables: {
    productIds: number[];
  };
};

export type Blog = {
  entityId: number;
  name: string;
  thumbnailImage: {
    urlOriginal: string;
  };
};

export type BigCommerceBlogsOperation = {
  data: {
    site: {
      content: {
        blog: {
          posts: {
            edges: Array<{
              node: Blog;
            }>;
          };
        };
      };
    };
  };
};

export type FooterLinks = {
  featuredProducts: {
    edges: Array<{
      node: {
        entityId: number;
        name: string;
        path: string;
      };
    }>;
  };
  settings: {
    socialMediaLinks: Array<{
      name: string;
      url: string;
    }>;
  };
  categoryTree: Array<{
    entityId: number;
    name: string;
    path: string;
  }>;
};

export type BigCommerceFooterLinksOperation = {
  data: {
    site: FooterLinks;
  };
};

export type MenuItems = {
  brands: Array<{
    entityId: number;
    name: string;
  }>;
  mensCategories: Array<{
    entityId: number;
    name: string;
  }>;
  womensCategories: Array<{
    entityId: number;
    name: string;
  }>;
};

export type BigCommerceMenuItemsOperation = {
  data: {
    site: {
      brands: {
        edges: Array<{
          node: {
            entityId: number;
            name: string;
          };
        }>;
      };
      categoryTree: Array<{
        entityId: number;
        name: string;
        children: Array<{
          entityId: number;
          name: string;
        }>;
      }>;
    };
  };
};

export type BigCommerceProductsByBrandIdsOperation = {
  data: {
    site: {
      brands: {
        edges: Array<{
          node: {
            entityId: number;
            name: string;
            products: {
              edges: Array<{
                node: {
                  entityId: number;
                };
              }>;
            };
          };
        }>;
      };
    };
  };
  variables: {
    brandIds: number[];
  };
};
