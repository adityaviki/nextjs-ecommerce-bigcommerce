import { cookies } from "next/headers";
import CartModal from "./modal";
import { getCartItems } from "@/lib/bigCommerce";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCartItems(cartId);
  }

  return <CartModal cart={cart} />;
}
