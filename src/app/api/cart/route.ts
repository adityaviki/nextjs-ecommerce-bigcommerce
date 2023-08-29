import { NextRequest, NextResponse } from "next/server";
import { getCartItems } from "@/lib/bigCommerce";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const result = await getCartItems();

    return NextResponse.json(result);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({
      error: "An error occured while handling the request",
      status: 500,
    });
  }
}
