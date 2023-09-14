import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: any) {
  const token = await getToken({ req, secret });
  return NextResponse.json(token?.accessToken);
}
