"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/lists/ListingHead";
import ListingInfo from "@/app/components/lists/ListingInfo";
import ListingReservation from "@/app/components/lists/ListingReservation";
import { Range } from "react-date-range";
import { SafeListing, SafeReservation } from "@/app/types";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { useMemo, useState, useEffect, useCallback } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import { responseHandler } from "@/utils/responseHandler";
import { setWholeFavList } from "@/app/redux/features/userSession/userSessionSlice";
import { onOpen as openLoginModal } from "@/app/redux/features/isLoginModalOpen/isLoginModalOpenSlice";
const currentUser = null;
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listings: SafeListing[] | null | any;
  reservations?: SafeReservation[];
  favList?: number[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listings,
  reservations = [],
  favList,
}) => {
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(listings.price);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(
    (state) => state.userSessionSlice.userData.user
  );
  useEffect(() => {
    dispatch(setWholeFavList(favList));
  }, [dispatch, favList]);
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

  const onCreateReservation = useCallback(async () => {
    setIsLoading(true);

    try {
      if (dateRange.startDate === dateRange.endDate) {
        throw new Error("Start date and end date cannot be the same");
      }
      if (!userData) {
        dispatch(openLoginModal());
        return null;
      }
      const res = await toast.promise(
        fetch("/api/reservations/", {
          method: "POST",
          body: JSON.stringify({
            startDate: format(dateRange.startDate!, "yyyy-MM-dd"),
            endDate: format(dateRange.endDate!, "yyyy-MM-dd"),
            listingId: listings.id,
            totalPrice,
          }),
        }),
        {
          pending: " Booking in progress... ⌛📅 ",
        }
      );
      const response = await responseHandler(res);

      toast.success(`"Booking Confirmed! 🎉✅`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDateRange(initialDateRange);
    } catch (error) {
      toast.error(`🦄 ${error}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDateRange(initialDateRange);
    }

    setIsLoading(false);
  }, [dateRange, listings, totalPrice]);
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
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
                user={listings.ownerName}
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
