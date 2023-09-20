import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import { SafeListing } from "@/app/types";
import { responseHandler } from "@/utils/responseHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SafeReservation } from "@/app/types";
interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const session = await getServerSession(authOptions);

  try {
    const result = await fetch(
      `${process.env.API_URL}listings/${params.listingId}/`
    );
    const favList = await fetch(`${process.env.API_URL}users/favorites/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      cache: "no-cache",
    });
    const list: SafeListing[] | null = await responseHandler(result);
    const favListRes = await responseHandler(favList);
    const ids =
      favListRes && favListRes.map((item: SafeReservation) => item.id);
    if (!list) {
      return (
        <>
          <EmptyState showReset={true} />
        </>
      );
    }
    return (
      <div className="pt-[200px]">
        <ListingClient listings={list} favList={ids} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default ListingPage;
