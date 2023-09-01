"use client";
import React, { createContext, useState, ReactNode } from "react";
import { Currency, notification } from "@/lib/types";
import { getCurrencyDetails } from "@/lib/actions/shippingLocation";
import Cookies from "js-cookie";

export const GlobalContext = createContext(
  {} as {
    notify: notification;
    setNotify: React.Dispatch<React.SetStateAction<notification>>;
    activeCurrency: Currency | undefined;
    activeShippingLocation: string;
    changeShippingLocation: (countrycode: string) => void;
  }
);

const GlobalProviderModal = ({
  children,
  currency,
  shippingLocation,
}: {
  children: ReactNode;
  currency: Currency | undefined;
  shippingLocation: string;
}) => {
  const [notify, setNotify] = useState<notification>({
    message: "",
    cb: () => {},
  });

  const [activeCurrency, setActiveCurrency] = useState<Currency | undefined>(
    currency
  );
  const [activeShippingLocation, setactiveShippingLocation] =
    useState<string>(shippingLocation);

  const changeShippingLocation = async (countrycode: string) => {
    const currency = await getCurrencyDetails(countrycode);
    setActiveCurrency(currency);
    setactiveShippingLocation(countrycode);
    Cookies.set("ShippingLocation", countrycode);
  };

  return (
    <GlobalContext.Provider
      value={{
        notify,
        setNotify,
        activeCurrency,
        activeShippingLocation,
        changeShippingLocation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProviderModal;
