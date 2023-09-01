export const productFragment = /* GraphQL */ `
  fragment product on Product {
    entityId
    name
    brand {
      name
    }
    defaultImage {
      urlOriginal
    }
    images {
      edges {
        node {
          urlOriginal
        }
      }
    }
    prices {
      price {
        currencyCode
        value
        formatted
      }
    }
    productOptions {
      edges {
        node {
          entityId
          displayName
          ... on MultipleChoiceOption {
            values {
              edges {
                node {
                  entityId
                  label
                }
              }
            }
          }
        }
      }
    }
    variants(first: 35, isPurchasable: true) {
      edges {
        node {
          isPurchasable
          entityId
          defaultImage {
            urlOriginal
          }
          prices {
            price {
              formatted
            }
          }
          options {
            edges {
              node {
                entityId
                displayName
                values {
                  edges {
                    node {
                      entityId
                      label
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const cartFragment = /* GraphQL */ `
  fragment cart on Cart {
    currencyCode
    entityId
    amount {
      value
    }
    lineItems {
      totalQuantity
      physicalItems {
        entityId
        productEntityId
        variantEntityId
        name
        brand
        imageUrl
        quantity
        originalPrice {
          value
        }
        selectedOptions {
          ... on CartSelectedMultipleChoiceOption {
            entityId
            name
            value
            valueEntityId
          }
        }
      }
    }
  }
`;
