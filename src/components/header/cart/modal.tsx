"use client";

import { BigCommerceCart, Currency } from "@/lib/types";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { cartIcon } from "@/components/icons";
import CartItemQuantity from "./cartItemQuantity";
import RemoveCartItem from "./removeCartItem";
import getSymbolFromCurrency from "currency-symbol-map";
import { GlobalContext } from "@/context/globalProviderModal";
import { useContext } from "react";

const CartModal = ({ cart }: { cart: BigCommerceCart | undefined }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showCart, setShowCart] = useState(false);
  const { activeCurrency } = useContext(GlobalContext);
  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowCart(false);
    }
  };

  useEffect(() => {
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={() => {
          toggleCart();
        }}
        className="hidden md:flex cursor-pointer gap-2 items-center justify-center"
      >
        <div>{cartIcon}</div>
        {cart && (
          <div className="font-bold">{cart?.lineItems.totalQuantity}</div>
        )}
      </div>
      <div className="flex md:hidden gap-2 items-center justify-center">
        <div>{cartIcon}</div>
        {cart && (
          <div className="font-bold">{cart?.lineItems.totalQuantity}</div>
        )}
      </div>
      <div
        className="absolute w-[375px] min-h-[400px] z-20 overflow-auto max-h-[600px] border md:-right-[24px] lg:-right-[72px] bg-white top-[42px]"
        style={{
          display: showCart ? "block" : "none",
          boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
        }}
      >
        <div className="m-4 font-medium text-xl">{`Your Cart (${
          cart?.lineItems.totalQuantity || "0"
        } Items)`}</div>
        {cart &&
          cart.lineItems.physicalItems.map((item) => {
            return (
              <div
                key={item.entityId}
                className="py-2 px-4 flex flex-col gap-4 border-b border-[#DBDADA]"
              >
                <div key={item.entityId} className="flex gap-4">
                  <div className="w-40 h-40 shrink-0 grow-0">
                    <Image
                      src={item.imageUrl}
                      className="object-cover w-full h-full"
                      width={160}
                      height={160}
                      alt={item.name}
                    />
                  </div>
                  <div className="flex flex-col text-xs py-3.5 gap-2">
                    <div>{item.name}</div>
                    <div className="flex gap-1">
                      <div>Size: </div>
                      <div>
                        {item.selectedOptions.find(
                          (option) => option.name.toLowerCase() === "size"
                        )?.value || "N/A"}
                      </div>
                    </div>
                    {item.selectedOptions.find(
                      (option) => option.name.toLowerCase() === "color"
                    ) && (
                      <div className="flex gap-1">
                        <div>Color: </div>
                        <div className="border w-fit h-fit p-[1px] cursor-pointer border-[#DBDADA]">
                          <div
                            style={{
                              backgroundColor: item.selectedOptions.find(
                                (option) =>
                                  option.name.toLowerCase() === "color"
                              )?.value,
                            }}
                            className="w-3.5 h-3.5"
                          />
                        </div>
                      </div>
                    )}
                    <div className="underline text-[#003459]">Change</div>
                    <div className="text-[#003459] font-bold text-base">{`${getSymbolFromCurrency(
                      activeCurrency?.code || ""
                    )} ${(
                      item.originalPrice.value *
                      (activeCurrency?.exchangeRate || 1)
                    ).toFixed(2)}`}</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <RemoveCartItem entityId={item.entityId} />
                  <CartItemQuantity item={item} />
                </div>
              </div>
            );
          })}
        {cart && (
          <div className="p-4">
            <div className="border-b border-[#DBDADA] flex font-bold justify-between">
              <div>Subtotal</div>
              <div className="text-[#003459]">{`${getSymbolFromCurrency(
                activeCurrency?.code || ""
              )} ${(
                cart?.amount.value * (activeCurrency?.exchangeRate || 1)
              ).toFixed(2)}`}</div>
            </div>
            <div className="flex items-center mt-4 gap-4">
              <div className="underline whitespace-nowrap text-[#003459]">
                View Cart
              </div>
              <div className="bg-[#003459] text-white rounded text-center py-2 w-full">
                Checkout
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="absolute top-[28px] z-20 right-0 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-white border-r-[12px] border-r-transparent"
        style={{ display: showCart ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default CartModal;
