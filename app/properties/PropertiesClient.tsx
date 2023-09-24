"use client";

import Container from "@/app/components/Container";
import { SafeListing, SafeReservation } from "@/app/types";
import Heading from "../components/Heading";
import ListingCard from "../components/lists/ListingCard";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface PropertiesClientProps {
  listings?: SafeListing[] | null;
  reservations?: SafeReservation[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  reservations = [],
}) => {
  const [liveProperties, setLiveProperties] = useState<SafeReservation[]>([]);
  useEffect(() => {
    setLiveProperties(reservations);
  }, [reservations]);
  const onDelete = useCallback(
    async (e: React.MouseEvent<Element, MouseEvent>, listID: number) => {
      e.stopPropagation();
      try {
        await toast.promise(
          fetch("/api/user/deleteListings", {
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
          {liveProperties.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              listData={reservation}
              reservation={reservation}
              actionId={reservation.id}
              onAction={(e: React.MouseEvent<Element, MouseEvent>) =>
                onDelete(e, reservation.id)
              }
              actionLabel="Delete property"
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PropertiesClient;
