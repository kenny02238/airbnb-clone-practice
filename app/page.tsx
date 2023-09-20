import { getAllListings } from "@/utils/getListings";
import Container from "./components/Container";
import ListingCard from "./components/lists/ListingCard";
import { getListingsByCategory } from "@/utils/getListingsByCategory";
import EmptyState from "@/app/components/EmptyState";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { responseHandler } from "@/utils/responseHandler";
import { SafeReservation } from "@/app/types";

import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Next.js",
    description: "The React Framework for the Web",
    url: "https://nextjs.org",
    siteName: "Next.js",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
interface ISearchParams {
  category: string;
}
const Home = async ({ searchParams }: { searchParams: ISearchParams }) => {
  const session = await getServerSession(authOptions);

  let listings;

  if (searchParams.category) {
    listings = await getListingsByCategory(searchParams.category);
  } else {
    listings = await getAllListings();
  }
  const favList = await fetch(`${process.env.API_URL}users/favorites/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    cache: "no-cache",
  });
  const favListRes = await responseHandler(favList);
  const ids = favListRes && favListRes.map((item: SafeReservation) => item.id);
  if (listings.length === 0) {
    return (
      <div>
        <EmptyState showReset />
      </div>
    );
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
          <ListingCard key={listing.id} listData={listing} favList={ids} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
