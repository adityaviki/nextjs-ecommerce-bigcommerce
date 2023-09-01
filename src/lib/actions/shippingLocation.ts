"use server";

import { ShippingLocationProps } from "../types";
import { US, GB, DE, FR, IN } from "country-flag-icons/string/3x2";
import { cookies } from "next/headers";
import { getCurrencies } from "../bigCommerce";

export const getShippingLocations = () => {
  const dummyShippingLocations: ShippingLocationProps[] = [
    {
      countryCode: "US",
      countryName: "United States",
      currencyCode: "USD",
      flag: US,
      symbol: "$",
    },
    {
      countryCode: "GB",
      countryName: "United Kingdom",
      currencyCode: "GBP",
      flag: GB,
      symbol: "£",
    },
    {
      countryCode: "DE",
      countryName: "Germany",
      currencyCode: "EUR",
      flag: DE,
      symbol: "€",
    },
    {
      countryCode: "FR",
      countryName: "France",
      currencyCode: "EUR",
      flag: FR,
      symbol: "€",
    },
    {
      countryCode: "IN",
      countryName: "India",
      currencyCode: "INR",
      flag: IN,
      symbol: "₹",
    },
  ];

  return dummyShippingLocations;
};

export const getCurrencyDetails = async (countryCode: string = "IN") => {
  const shippingLocations = getShippingLocations();
  let currencies = await getCurrencies();

  currencies = currencies.filter((currency) => {
    return currency.isTransactional;
  });

  const currency = currencies.find(
    (currency) =>
      currency.code ===
      shippingLocations.find((location) => location.countryCode === countryCode)
        ?.currencyCode
  );

  return currency;
};
