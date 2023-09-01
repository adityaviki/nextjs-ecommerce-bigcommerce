import { cartFragment } from "./fragments";

export const createCartMutation = /* GraphQL */ `
  mutation createCartMutation($lineItemInput: CreateCartInput!) {
    cart {
      createCart(input: $lineItemInput) {
        cart {
          entityId
        }
      }
    }
  }
`;

export const addCartLineItemMutation = /* GraphQL */ `
  mutation addCartLineItem($lineItemInput: AddCartLineItemsInput!) {
    cart {
      addCartLineItems(input: $lineItemInput) {
        cart {
          entityId
        }
      }
    }
  }
`;

export const deleteCartLineItemMutation = /* GraphQL */ `
  mutation deleteCartLineItem($lineItemInput: DeleteCartLineItemInput!) {
    cart {
      deleteCartLineItem(input: $lineItemInput) {
        cart {
          ...cart
        }
      }
    }
  }
  ${cartFragment}
`;

export const updateCartLineItemMutation = /* GraphQL */ `
  mutation updateCartLineItem($lineItemInput: UpdateCartLineItemInput!) {
    cart {
      updateCartLineItem(input: $lineItemInput) {
        cart {
          ...cart
        }
      }
    }
  }
  ${cartFragment}
`;
