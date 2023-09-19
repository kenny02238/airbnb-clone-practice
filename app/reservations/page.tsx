import EmptyState from "@/app/components/EmptyState";
import { responseHandler } from "@/utils/responseHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SafeReservation } from "../types";
import ReservationsClient from "./ReservationsClient";
interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const session = await getServerSession(authOptions);
  try {
    const result = await fetch(`${process.env.API_URL}reservations/owner/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    const list: SafeReservation[] | null = await responseHandler(result);
    console.log("rst", list);

    if (!list) {
      return (
        <>
          <EmptyState title="Unauthorized" subtitle="Please login" />
        </>
      );
    }
    return (
      <div className="pt-[200px]">
        <ReservationsClient reservations={list} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default ListingPage;
