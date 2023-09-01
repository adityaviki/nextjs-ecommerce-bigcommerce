import { useTransition, useContext } from "react";
import { GlobalContext } from "@/context/globalProviderModal";
import { deleteIcon } from "@/components/icons";
import { deleteItem } from "@/lib/actions/cart";
import { useRouter } from "next/navigation";

const RemoveCartItem = ({ entityId }: { entityId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { setNotify } = useContext(GlobalContext);
  const router = useRouter();

  const removeItem = () => {
    startTransition(async () => {
      const res = await deleteItem(entityId);
      if (res instanceof Error) {
        setNotify({ message: res.message });
        throw res;
      }
      router.refresh();
    });
  };

  return (
    <>
      {!isPending && (
        <div
          onClick={() => {
            removeItem();
          }}
          className="flex w-24 cursor-pointer items-center justify-center gap-2"
        >
          <div>{deleteIcon}</div>
          <div>Remove</div>
        </div>
      )}
      {isPending && (
        <div className="flex w-24 items-center justify-center gap-2">
          <div className="m-auto animate-spin rounded-full h-4 w-4 border-t-2 border-[#003459]"></div>
        </div>
      )}
    </>
  );
};

export default RemoveCartItem;
