import { getAllListings } from "@/utils/getListings";
import Container from "./components/Container";
import ListingCard from "./components/lists/ListingCard";
import house from "@/public/images/house.jpg";
import { getListingsByCategory } from "@/utils/getListingsByCategory";

interface ISearchParams {
  category: string;
}
const Home = async ({ searchParams }: { searchParams: ISearchParams }) => {
  let listings;
  if (searchParams.category) {
    listings = await getListingsByCategory();
  } else {
    listings = await getAllListings();
  }

  return (
    <Container>
      <div
        className="
            pt-[200px]
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-4
            2xl:grid-cols-6
            gap-8
          "
      >
        {listings.map((listing: any) => (
          <ListingCard key={listing.id} listData={listing} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
