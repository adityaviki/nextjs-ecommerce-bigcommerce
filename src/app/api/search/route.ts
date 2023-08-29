import { NextRequest, NextResponse } from "next/server";
import { ErrorProps } from "@/lib/types";
import { getSearchProducts } from "@/lib/bigCommerce";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query");

    if (!query) {
      return NextResponse.json({
        error: "No query provided",
        status: 400,
      });
    }

    const searchProducts = await getSearchProducts(query);

    return NextResponse.json(searchProducts);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      error: "An error occured while handling the request",
      status: 500,
    });
  }
}
