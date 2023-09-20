"use client";

import Container from "@/app/components/Container";
import { SafeListing, SafeReservation } from "@/app/types";
import Heading from "../components/Heading";
import ListingCard from "../components/lists/ListingCard";
const currentUser = null;

interface PropertiesClientProps {
  listings?: SafeListing[] | null | any;
  reservations?: SafeReservation[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  reservations = [],
}) => {
  return (
    <div>
      <Container>
        <Heading title="Properties" subtitle="List of your properties" />
        <div
          className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
        >
          {reservations.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              listData={reservation}
              reservation={reservation}
              actionId={reservation.id}
              onAction={() => {}}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PropertiesClient;
