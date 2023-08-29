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
