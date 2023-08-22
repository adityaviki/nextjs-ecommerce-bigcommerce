import { NextRequest } from "next/server";
import path from "path";
import config from "@/config/config";
import errorHandler from "@/lib/errorHandler";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
  } catch (err: any) {
    return errorHandler(err);
  }
}
