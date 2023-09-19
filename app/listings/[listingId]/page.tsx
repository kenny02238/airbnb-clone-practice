import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import { SafeListing } from "@/app/types";
import { responseHandler } from "@/utils/responseHandler";
interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  try {
    const result = await fetch(
      `${process.env.API_URL}listings/${params.listingId}/`
    );
    const list: SafeListing[] | null = await responseHandler(result);

    if (!list) {
      return (
        <>
          <EmptyState showReset={true} />
        </>
      );
    }
    return (
      <div className="pt-[200px]">
        <ListingClient listings={list} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default ListingPage;
