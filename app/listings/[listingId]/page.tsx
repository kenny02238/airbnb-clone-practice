import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import { SafeListing } from "@/app/types";

interface IParams {
  category: string;
}

const ListingPage = async ({ params: { category } }: { params: IParams }) => {
  const list: SafeListing[] | null = null;
  // if (!list) {
  //   return (
  //     <>
  //       <EmptyState showReset={true} />
  //     </>
  //   );
  // }

  return (
    <div className="pt-[200px]">
      <ListingClient listings={list} />
    </div>
  );
};

export default ListingPage;
