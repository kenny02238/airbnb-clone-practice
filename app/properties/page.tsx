import EmptyState from "@/app/components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import { responseHandler } from "@/utils/responseHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SafeReservation } from "../types";
interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const session = await getServerSession(authOptions);
  try {
    const result = await fetch(`${process.env.API_URL}listings/owner/`, {
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
        <PropertiesClient reservations={list} />
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
