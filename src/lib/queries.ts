import { cartFragment, productFragment } from "./fragments";

export const getHomePageBannersQuery = /* GraphQL */ `
  query getHomePageBanners {
    site {
      content {
        banners {
          homePage {
            edges {
              node {
                content
              }
            }
          }
        }
      }
    }
  }
`;

export const getBrandNamesByCategoryIdQuery = /* GraphQL */ `
  query getBrandNamesByCategoryId($categoryId: Int!) {
    site {
      category(entityId: $categoryId) {
        products(first: 50) {
          edges {
            node {
              brand {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const getFooterLinksQuery = /* GraphQL */ `
  query getFooterLinks {
    site {
      featuredProducts {
        edges {
          node {
            entityId
            name
            path
          }
        }
      }
      settings {
        socialMediaLinks {
          name
          url
        }
      }
      categoryTree {
        entityId
        name
        path
      }
    }
  }
`;

export const getNewProductsQuery = /* GraphQL */ `
  query getNewProducts {
    site {
      newestProducts(first: 5, hideOutOfStock: true) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getSearchProductsQuery = /* GraphQL */ `
  query getSearchProducts($filters: SearchProductsFiltersInput!) {
    site {
      search {
        searchProducts(filters: $filters) {
          products {
            edges {
              node {
                ...product
              }
            }
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getPopularBrandsQuery = /* GraphQL */ `
  query getPopularBrands {
    site {
      popularBrands(first: 2) {
        edges {
          node {
            entityId
          }
        }
      }
    }
  }
`;

export const getFeaturedProductsQuery = /* GraphQL */ `
  query getFeaturedProducts {
    site {
      featuredProducts(first: 6, hideOutOfStock: true) {
        edges {
          node {
            entityId
            name
          }
        }
      }
    }
  }
`;

export const getProductsByIdsQuery = /* GraphQL */ `
  query getProductsByIds($productIds: [Int!]) {
    site {
      products(entityIds: $productIds) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getMenuItemsQuery = /* GraphQL */ `
  query getMenuItems {
    site {
      brands {
        edges {
          node {
            entityId
            name
          }
        }
      }
      categoryTree {
        entityId
        name
        children {
          entityId
          name
        }
      }
    }
  }
`;

export const getProductsByBrandIdsQuery = /* GraphQL */ `
  query getProductsByBrandIds($brandIds: [Int!]) {
    site {
      brands(entityIds: $brandIds) {
        edges {
          node {
            entityId
            name
            products(first: 5, hideOutOfStock: true) {
              edges {
                node {
                  entityId
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getBlogsQuery = /* GraphQL */ `
  query getBlogs {
    site {
      content {
        blog {
          posts(first: 3) {
            edges {
              node {
                entityId
                name
                thumbnailImage {
                  urlOriginal
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getCartItemsQuery = /* GraphQL */ `
  query getCartItems($cartEntityId: String!) {
    site {
      cart(entityId: $cartEntityId) {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const getCurrenciesQuery = /* GraphQL */ `
  query getCurrencies {
    site {
      currencies {
        edges {
          node {
            code
            exchangeRate
            name
            isActive
            isTransactional
            display {
              symbol
            }
          }
        }
      }
    }
  }
`;

export const getStoreNameQuery = /* GraphQL */ `
  query getStoreName {
    site {
      settings {
        storeName
      }
    }
  }
`;
