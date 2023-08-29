import { NextRequest, NextResponse } from "next/server";
import { ErrorProps } from "@/lib/types";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");

    if (!page) {
      const error: ErrorProps = new Error(
        "query paramenter 'page' is required"
      );
      error.status = 400;
      throw error;
    }
  } catch (err: any) {
    console.log(err);
    const { message, status } = err;
    return NextResponse.json({
      message: message || "An error occured while handling the request",
      status: status || 500,
    });
  }
}
