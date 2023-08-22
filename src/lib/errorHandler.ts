import { NextResponse } from "next/server";

const errorHandler = (err: any) => {
  console.log(err);
  return NextResponse.json(
    { error: "An error occured while handling the request" },
    { status: 500 }
  );
};

export default errorHandler;
