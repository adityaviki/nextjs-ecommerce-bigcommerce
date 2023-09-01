import { CartItem, CartPhysicalItem } from "@/lib/types";
import { useTransition, useContext } from "react";
import { GlobalContext } from "@/context/globalProviderModal";
import { updateItem } from "@/lib/actions/cart";
import { minusIcon, plusIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

const CartItemQuantity = ({ item }: { item: CartPhysicalItem }) => {
  const [isPending, startTransition] = useTransition();
  const { setNotify } = useContext(GlobalContext);
  const router = useRouter();

  const updateQuantity = (quantity: number) => {
    if (quantity < 1) return;
    startTransition(async () => {
      const data: CartItem = {
        quantity: quantity,
        productEntityId: item.productEntityId,
        variantEntityId: item.variantEntityId,
        selectedOptions: {
          multipleChoices: [
            {
              optionEntityId: item.selectedOptions[0].entityId,
              optionValueEntityId: item.selectedOptions[0].valueEntityId,
            },
            {
              optionEntityId: item.selectedOptions[1].entityId,
              optionValueEntityId: item.selectedOptions[1].valueEntityId,
            },
          ],
        },
      };

      const res = await updateItem(item.entityId, data);

      if (res instanceof Error) {
        setNotify({ message: res.message });
        return;
      }
      router.refresh();
    });
  };

  return (
    <>
      <div className="bg-[#F8F8F9] rounded flex items-center w-[120px] h-11 mr-8 justify-between py-2.5 px-2">
        {item.quantity > 1 ? (
          <div
            className="cursor-pointer"
            onClick={() => {
              updateQuantity(item.quantity - 1);
            }}
          >
            {minusIcon}
          </div>
        ) : (
          <div className="opacity-50">{minusIcon}</div>
        )}
        <div>
          {isPending ? (
            <div className="m-auto animate-spin rounded-full h-4 w-4 border-t-2 border-[#003459]" />
          ) : (
            item.quantity
          )}
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            updateQuantity(item.quantity + 1);
          }}
        >
          {plusIcon}
        </div>
      </div>
    </>
  );
};

export default CartItemQuantity;
