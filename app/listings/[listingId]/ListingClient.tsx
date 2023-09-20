"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/lists/ListingHead";
import ListingInfo from "@/app/components/lists/ListingInfo";
import ListingReservation from "@/app/components/lists/ListingReservation";
import { Range } from "react-date-range";
import { SafeListing, SafeReservation } from "@/app/types";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useMemo, useState, useEffect, useCallback } from "react";

const currentUser = null;
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listings: SafeListing[] | null | any;
  reservations?: SafeReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listings,
  reservations = [],
}) => {
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(listings.price);
  const [isLoading, setIsLoading] = useState(false);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);
  const onCreateReservation = useCallback(() => {
    setIsLoading(true);
    setIsLoading(false);
    console.log("dateRange", dateRange);
  }, [dateRange]);
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listings.price) {
        setTotalPrice(dayCount * listings.price);
      } else {
        setTotalPrice(listings.price);
      }
    }
  }, [dateRange, listings.price]);

  return (
    <div>
      <Container>
        <div
          className="
          max-w-screen-lg 
          mx-auto
        "
        >
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listings.title}
              imageSrc={listings.imageSrc}
              locationValue={listings.locationValue}
              id={listings.id}
              currentUser={currentUser}
            />
            <div
              className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
            >
              <ListingInfo
                user={{ name: "Kenny" }}
                category={listings.category}
                description={listings.description}
                roomCount={listings.roomCount}
                guestCount={listings.guestCount}
                bathroomCount={listings.bathroomCount}
                locationValue={listings.locationValue}
              />
              <div
                className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
              >
                <ListingReservation
                  price={listings.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  onSubmit={onCreateReservation}
                  dateRange={dateRange}
                  disabledDates={disabledDates}
                  disabled={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListingClient;
