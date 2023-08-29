import { NextRequest, NextResponse } from "next/server";
import { ErrorProps } from "@/lib/types";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const oneWeak = 60 * 60 * 24 * 7;
    const expiresAt = Math.floor(Date.now() / 1000) + oneWeak;

    const body = {
      channel_id: process.env.BIGCOMMERCE_CHANNEL_ID!,
      expires_at: expiresAt,
      allowed_cors_origins: [process.env.BIGCOMMERCE_STORE_DOMAIN!],
    };

    const res = await fetch(
      "https://api.bigcommerce.com/stores/2nseuo3ect/v3/storefront/api-token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Auth-Token": process.env.BIGCOMMERCE_ACCESS_TOKEN!,
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const { message } = await res.json();
      const error: ErrorProps = new Error(
        message || "An error occurred while fetching the data."
      );
      error.status = res.status; // e.g. 500
      throw error;
    }

    const result = await res.json();

    return NextResponse.json({
      token: result.data.token,
      expiresAt: expiresAt,
    });
  } catch (err: any) {
    console.log(err);
    const { message, status } = err;
    return NextResponse.json({
      message: message || "An error occured while handling the request",
      status: status || 500,
    });
  }
}
