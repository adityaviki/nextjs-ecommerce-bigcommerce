"use client";

// import { Cart } from "@/lib/types";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import getSymbolFromCurrency from "currency-symbol-map";
// import { cartIcon, deleteIcon, minusIcon, plusIcon } from "../icons";
// import { getCartItems } from "@/lib/bigCommerce";

const Cart = () => {
  return "";
  // const [showCart, setShowCart] = useState(false);
  // const [cart, setCart] = useState<Cart>();
  // const toggleCart = () => {
  //   setShowCart((prev) => !prev);
  // };

  // useEffect(() => {
  //   fetch("/api/cart")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.error) {
  //         console.log(data.error);
  //         return;
  //       }
  //       setCart(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // return (
  //   <div className="relative">
  //     <div
  //       onClick={() => {
  //         toggleCart();
  //       }}
  //       className="flex gap-2 items-center justify-center"
  //     >
  //       <div>{cartIcon}</div>
  //       {cart?.totalQuantity && cart?.totalQuantity > 0 && (
  //         <div className="font-bold">{cart.totalQuantity}</div>
  //       )}
  //     </div>
  //     {/* <div className="absolute border top-[28px] right-0 w-0 h-0 border-l-[15px] border-l-transparent border-b-[25px] border-b-white border-r-[15px] border-r-transparent"></div> */}
  //     <div
  //       className="absolute w-[375px] z-20 overflow-auto max-h-[600px] border md:-right-[24px] lg:-right-[72px] bg-white top-[42px]"
  //       style={{
  //         display: showCart ? "block" : "none",
  //         boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
  //       }}
  //     >
  //       <div className="m-4 font-medium text-xl">{`Your Cart (${
  //         cart?.totalQuantity || "0"
  //       } Items)`}</div>
  //       {cart &&
  //         cart.physicalItems.map((item) => {
  //           return (
  //             <div
  //               key={item.entityId}
  //               className="py-2 px-4 flex flex-col gap-4 border-b border-[#DBDADA]"
  //             >
  //               <div key={item.entityId} className="flex gap-4">
  //                 <div className="w-40 h-40 shrink-0 grow-0">
  //                   <Image
  //                     src={item.imageUrl}
  //                     className="object-cover w-full h-full"
  //                     width={160}
  //                     height={160}
  //                     alt={item.name}
  //                   />
  //                 </div>
  //                 <div className="flex flex-col text-xs py-3.5 gap-2">
  //                   <div>{item.name}</div>
  //                   {item.size && (
  //                     <div className="flex gap-1">
  //                       <div>Size: </div>
  //                       <div>{item.size}</div>
  //                     </div>
  //                   )}
  //                   {item.color && (
  //                     <div className="flex gap-1">
  //                       <div>Color: </div>
  //                       <div className="border w-fit h-fit p-[1px] cursor-pointer border-[#DBDADA]">
  //                         <div
  //                           style={{ backgroundColor: item.color }}
  //                           className="w-3.5 h-3.5"
  //                         />
  //                       </div>
  //                     </div>
  //                   )}
  //                   <div className="underline text-[#003459]">Change</div>
  //                   <div className="text-[#003459] font-bold text-base">{`${getSymbolFromCurrency(
  //                     cart.currencyCode
  //                   )}${item.price}`}</div>
  //                 </div>
  //               </div>
  //               <div className="flex items-center gap-24">
  //                 <div className="flex items-center justify-center gap-2">
  //                   <div>{deleteIcon}</div>
  //                   <div>Remove</div>
  //                 </div>
  //                 <div className="bg-[#F8F8F9] rounded flex items-center w-[120px] justify-between py-2.5 px-2">
  //                   <div>{minusIcon}</div>
  //                   <div>{item.quantity}</div>
  //                   <div>{plusIcon}</div>
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       <div className="p-4">
  //         <div className="border-b border-[#DBDADA] flex font-bold justify-between">
  //           <div>Subtotal</div>
  //           <div className="text-[#003459]">{`${getSymbolFromCurrency(
  //             cart?.currencyCode || ""
  //           )}${cart?.amount}`}</div>
  //         </div>
  //         <div className="flex items-center mt-4 gap-4">
  //           <div className="underline whitespace-nowrap text-[#003459]">
  //             View Cart
  //           </div>
  //           <div className="bg-[#003459] text-white rounded text-center py-2 w-full">
  //             Checkout
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div
  //       className="absolute top-[28px] z-20 right-0 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-white border-r-[12px] border-r-transparent"
  //       style={{ display: showCart ? "block" : "none" }}
  //     ></div>
  //   </div>
  // );
};

export default Cart;
