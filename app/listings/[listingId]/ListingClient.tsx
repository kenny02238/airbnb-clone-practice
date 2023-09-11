"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/lists/ListingHead";
import ListingInfo from "@/app/components/lists/ListingInfo";
import ListingReservation from "@/app/components/lists/ListingReservation";
import { Range } from "react-date-range";
import { SafeListing, SafeReservation } from "@/app/types";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useMemo, useState, useEffect } from "react";
import house from "@/public/images/house.jpg";

const listing = {
  id: "1",
  title: "Test Room",
  description: "Test Room Description",
  imageSrc: `${house.src}`,
  createdAt: "",
  category: "Test Category",
  roomCount: "2",
  bathroomCount: "3",
  guestCount: "3",
  locationValue: "",
  userId: "Test User Id",
  price: 80000,
  user: undefined,
};
const currentUser = null;
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listings: SafeListing[] | null;
  reservations?: SafeReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listings,
  reservations = [],
}) => {
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(listing.price);

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
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);
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
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
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
                category={undefined}
                description={listing.description}
                roomCount={123}
                guestCount={123}
                bathroomCount={123}
                locationValue={listing.locationValue}
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
                  price={123}
                  totalPrice={231}
                  onChangeDate={() => {}}
                  onSubmit={() => {}}
                  dateRange={dateRange}
                  disabledDates={disabledDates}
                  disabled={true}
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
