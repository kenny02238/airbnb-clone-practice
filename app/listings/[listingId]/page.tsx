import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import { SafeListing } from "@/app/types";

interface IParams {
  category: string;
}

const page = async ({ params: { category } }: { params: IParams }) => {
  //TODO 這頁應該是要拿到訂房詳細資訊嗎 不確定 先不要動
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

export default page;
