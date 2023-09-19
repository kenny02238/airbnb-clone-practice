import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: any) {
  const token = await getToken({ req, secret });

  try {
    const response = await fetch(`${process.env.API_URL}users/favorites/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
      cache: "no-cache",
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
export async function POST(req: any) {
  const request = await req.text();
  const listingId = JSON.parse(request).listingId;
  const token = await getToken({ req, secret });

  try {
    const response = await fetch(
      `${process.env.API_URL}listings/${listingId}/favorite/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
