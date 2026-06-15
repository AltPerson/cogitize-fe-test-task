import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const response = await fetch(
    `https://api.miex.one/api/v1/public/assets?${searchParams.toString()}`
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
};