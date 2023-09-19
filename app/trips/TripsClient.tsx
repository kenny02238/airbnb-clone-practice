"use client";

import Container from "@/app/components/Container";
import ListingCard from "../components/lists/ListingCard";
import Heading from "../components/Heading";
import { SafeListing, SafeReservation } from "@/app/types";

const currentUser = null;

interface TripsClientProps {
  listings?: SafeListing[] | null | any;
  reservations?: SafeReservation[];
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations = [] }) => {
  return (
    <div>
      <Container>
        <Heading
          title="Trips"
          subtitle="Where you've been and where you're going"
        />
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
              listData={reservation.listing}
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

export default TripsClient;
