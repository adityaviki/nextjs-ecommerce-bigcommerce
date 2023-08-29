export interface ErrorProps extends Error {
  status?: number;
}

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type PageBanner = {
  content: string;
};

export type Category = {
  entityId: number;
  name: string;
  image: {
    urlOriginal: string;
  };
};

export type BigCommerceCategoryOperation = {
  data: {
    site: {
      categoryTree: Category[];
    };
  };
};

export type Cart = {
  entityId: string;
  currencyCode: string;
  amount: number;
  totalQuantity: number;
  physicalItems: Array<{
    entityId: string;
    productId: number;
    variantId: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
    color: string;
    size: string;
  }>;
};

export type BigCommerceCartItemsOperation = {
  data: {
    site: {
      cart: {
        currencyCode: string;
        entityId: string;
        amount: {
          value: number;
        };
        lineItems: {
          totalQuantity: number;
          physicalItems: Array<{
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
              name: string;
              value: string;
            }>;
          }>;
        };
      };
    };
  };
  variables: {
    cartEntityId: string;
  };
};

export type SearchProduct = {
  entityId: number;
  name: string;
  brand: string;
  image: string;
  price: string;
};

export type BigCommerceSearchProductsOperation = {
  data: {
    site: {
      search: {
        searchProducts: {
          products: {
            edges: Array<{
              node: {
                entityId: number;
                name: string;
                brand: {
                  name: string;
                };
                prices: {
                  price: {
                    formatted: string;
                  };
                };
                defaultImage: {
                  urlOriginal: string;
                };
              };
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

export type FormattedVariant = {
  entityId: number;
  defaultImage: string;
  price: string;
  color: {
    entityId: number;
    label: string;
  };
  size: {};
};

export type FormattedProduct = {
  entityId: number;
  name: string;
  brand: string;
  defaultImage: string;
  alternateImage: string;
  price: string;
  variants: FormattedVariant[];
};

export type PopularBrands = {
  entityId: number;
  name: string;
  products: FormattedProduct[];
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

export type ListOfEntityIds = {
  entityId: number;
};

export type BigCommercePopularBrandsOperation = {
  data: {
    site: {
      popularBrands: Connection<ListOfEntityIds>;
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

export type SubCategories = {
  name: string;
  children: Array<{
    name: string;
  }>;
};

export type BigCommerceSubCategoriesOperation = {
  data: {
    site: {
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

export type BigCommerceGetBrandNameByCategoryIdOperation = {
  data: {
    site: {
      category: {
        products: {
          edges: Array<{
            node: {
              brand: {
                name: string;
              };
            };
          }>;
        };
      };
    };
  };
  variables: {
    categoryId: number;
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
            products: Connection<ListOfEntityIds>;
          };
        }>;
      };
    };
  };
  variables: {
    brandIds: number[];
  };
};

export type BigCommerceHomePageBannersOperation = {
  data: {
    site: {
      content: {
        banners: {
          homePage: Connection<PageBanner>;
        };
      };
    };
  };
};

export type BigCommerceSearchPageBannersOperation = {
  data: {
    site: {
      content: {
        banners: {
          searchPage: Connection<PageBanner>;
        };
      };
    };
  };
};

export type BigCommerceCategoryPageBannersOperation = {
  data: {
    site: {
      content: {
        banners: {
          categoryPage: Connection<PageBanner>;
        };
      };
    };
  };
};

export type BigCommerceBrandPageBannersOperation = {
  data: {
    site: {
      content: {
        banners: {
          brandPage: Connection<PageBanner>;
        };
      };
    };
  };
};
