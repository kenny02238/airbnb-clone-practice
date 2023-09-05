"use client";

import Container from "@/app/components/Container";
import ListingCard from "@/app/components/lists/ListingCard";
import { SafeListing } from "@/app/types";

interface ListingClientProps {
  listings: SafeListing[] | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ listings }) => {
  return (
    <div>
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
          {listings &&
            listings.map((listing: any) => (
              <ListingCard
                currentUser={{ name: "kenny" }}
                key={listing.id}
                data={listing}
              />
            ))}
        </div>
      </Container>
    </div>
  );
};

export default ListingClient;
