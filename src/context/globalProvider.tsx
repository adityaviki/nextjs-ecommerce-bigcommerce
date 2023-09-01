"use server";
import { getCurrencyDetails } from "@/lib/actions/shippingLocation";
import GlobalProviderModal from "./globalProviderModal";
import { cookies } from "next/headers";

const GlobalProvider = async ({ children }: { children: React.ReactNode }) => {
  let shippingLocation = cookies().get("ShippingLocation")?.value;

  if (!shippingLocation) {
    shippingLocation = "IN";
  }

  const currency = await getCurrencyDetails(shippingLocation);

  return (
    <GlobalProviderModal
      currency={currency}
      shippingLocation={shippingLocation}
    >
      {children}
    </GlobalProviderModal>
  );
};

export default GlobalProvider;
