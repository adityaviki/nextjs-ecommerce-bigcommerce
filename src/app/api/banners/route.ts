import { NextRequest, NextResponse } from "next/server";
import { getPageBanners } from "@/lib/bigCommerce";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");

    if (!page)
      return NextResponse.json(
        { error: "query parameter 'page' not provided" },
        { status: 400 }
      );

    const banners = await getPageBanners(page);

    return NextResponse.json(banners);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occured while handling the request" },
      { status: 500 }
    );
  }
}
