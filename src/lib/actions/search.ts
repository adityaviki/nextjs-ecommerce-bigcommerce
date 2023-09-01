"use server";

import { getProductsByQuery } from "../bigCommerce";
import { Product } from "../types";

export const getProducts = async (
  query: string
): Promise<Error | Product[]> => {
  try {
    return await getProductsByQuery(query);
  } catch (e) {
    return new Error("Error searching products");
  }
};
