import EmptyState from "@/app/components/EmptyState";
import TripsClient from "./TripsClient";
import { SafeReservation } from "@/app/types";
import { responseHandler } from "@/utils/responseHandler";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const session = await getServerSession(authOptions);
  try {
    const result = await fetch(`${process.env.API_URL}reservations/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
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
        <TripsClient reservations={list} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default ListingPage;
