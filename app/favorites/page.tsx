import EmptyState from "@/app/components/EmptyState";
import { getServerSession } from "next-auth/next";
import { responseHandler } from "@/utils/responseHandler";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FavoritesClient from "./FavoritesClient";
import { SafeReservation } from "../types";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const session = await getServerSession(authOptions);
  try {
    const result = await fetch(`${process.env.API_URL}users/favorites/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      cache: "no-cache",
    });

    const list: SafeReservation[] | null = await responseHandler(result);

    if (!list) {
      return (
        <>
          <EmptyState title="Unauthorized" subtitle="Please login" />
        </>
      );
    }
    return (
      <div className="pt-[200px]">
        <FavoritesClient listings={list} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default ListingPage;
