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
    const ids = session?.accessToken
      ? (
          await responseHandler(
            await fetch(`${process.env.API_URL}users/favorites/`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
              cache: "no-cache",
            })
          )
        )?.map((item: SafeReservation) => item.id)
      : null;
    const list: SafeListing[] | null = await responseHandler(result);
    console.log(list);
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
    return (
      <>
        <EmptyState title={`${error}`} subtitle="Please login" />
      </>
    );
  }
};

export default ListingPage;
