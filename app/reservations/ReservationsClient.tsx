"use client";

import Container from "@/app/components/Container";
import { SafeListing, SafeReservation } from "@/app/types";
import Heading from "../components/Heading";
import ListingCard from "../components/lists/ListingCard";

const currentUser = null;

interface ReservationsClientProps {
  listings?: SafeListing[] | null | any;
  reservations?: SafeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations = [],
}) => {
  return (
    <div>
      <Container>
        <Heading title="Reservations" subtitle="Bookings on your properties" />
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
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ReservationsClient;
