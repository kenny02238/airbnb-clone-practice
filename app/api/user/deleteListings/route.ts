import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(req: any) {
  const token = await getToken({ req, secret });
  const request = await req.json();

  try {
    const response = await fetch(
      `${process.env.API_URL}listings/${request.id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
