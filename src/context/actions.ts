"use server";

import { getCurrencies } from "@/lib/bigCommerce";
import { Currency } from "@/lib/types";

export const fetchCurriencies = async (): Promise<Currency[] | Error> => {
  try {
    const result = await getCurrencies();
    return result.filter((currency) => {
      return currency.isTransactional;
    });
  } catch (e) {
    return new Error("Error fetching cart items");
  }
};
