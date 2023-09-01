"use server";

import { cookies } from "next/headers";
import { BigCommerceCart, CartItem } from "../types";
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../bigCommerce";

export const addItem = async (data: CartItem): Promise<Error | string> => {
  const cartId = cookies().get("cartId")?.value;
  try {
    const newCartId = await addToCart(cartId ? cartId : "", data);
    cookies().set("cartId", newCartId);
    return newCartId;
  } catch (e) {
    return new Error("Error adding item to cart");
  }
};

export const fetchCartItems = async (): Promise<
  Error | BigCommerceCart | null
> => {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) return null;
  try {
    return await getCartItems(cartId);
  } catch (e) {
    return new Error("Error fetching cart items");
  }
};

export const deleteItem = async (
  itemEntityId: string
): Promise<Error | BigCommerceCart> => {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId || !itemEntityId)
    return new Error("Error deleting item, Please try again later");
  try {
    const cart = await deleteCartItem(cartId, itemEntityId);

    if (cart) {
      cookies().set("cartId", cartId);
    } else {
      cookies().delete("cartId");
    }
    return cart;
  } catch (e) {
    return new Error("Error fetching cart items");
  }
};

export const updateItem = async (
  itemEntityId: string,
  lineItem: CartItem
): Promise<Error | BigCommerceCart> => {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId || !itemEntityId || !lineItem)
    return new Error("cartId, itemEntityId, and lineItem are required");
  try {
    const cart = await updateCartItem(cartId, itemEntityId, lineItem);
    return cart;
  } catch (e) {
    return new Error("Error fetching cart items");
  }
};
