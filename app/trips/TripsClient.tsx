"use client";

import Container from "@/app/components/Container";
import ListingCard from "../components/lists/ListingCard";
import Heading from "../components/Heading";
import { SafeListing, SafeReservation } from "@/app/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const currentUser = null;

interface TripsClientProps {
  listings?: SafeListing[] | null | any;
  reservations?: SafeReservation[];
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations = [] }) => {
  const [liveProperties, setLiveProperties] = useState<SafeReservation[]>([]);
  useEffect(() => {
    setLiveProperties(reservations);
  }, [reservations]);
  const onDelete = useCallback(
    async (e: React.MouseEvent<Element, MouseEvent>, listID: number) => {
      e.stopPropagation();
      try {
        await toast.promise(
          fetch("/api/reservations", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: listID,
            }),
          }),
          {
            pending: "Deleting property...",
            success: "Property deleted!",
            error: "Failed to delete property",
          }
        );
        setLiveProperties((prev) => prev.filter((item) => item.id !== listID));
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
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
          {liveProperties.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              listData={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={(e: React.MouseEvent<Element, MouseEvent>) =>
                onDelete(e, reservation.id)
              }
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
