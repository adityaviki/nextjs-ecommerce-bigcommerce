"use client";
import { ShippingLocationProps } from "@/lib/types";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalProviderModal";

const CurrentShippingLocationFlag = ({
  shippingLocations,
}: {
  shippingLocations: ShippingLocationProps[];
}) => {
  const { activeShippingLocation } = useContext(GlobalContext);
  const activeCountry = shippingLocations.find(
    (location) => location.countryCode === activeShippingLocation
  );

  return (
    <div
      className="md:hidden w-10 h-4 flex items-center justify-center"
      dangerouslySetInnerHTML={{
        __html: activeCountry?.flag || "",
      }}
    />
  );
};

export default CurrentShippingLocationFlag;
