"use client";

import { SafeListing } from "@/app/types";
import HeartButton from "./HeartButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "@/app/types";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "@/app/redux/hook";
import { setWholeFavList } from "@/app/redux/features/userSession/userSessionSlice";
import useCountries from "@/app/hooks/useCountries";
import Button from "../Button";
import { format } from "date-fns";

interface ListingCardProps {
  listData: SafeListing;
  reservation?: SafeReservation;
  actionId?: string;
  onAction?: (id: string) => void;
  actionLabel?: string;
  currentUser?: SafeUser | null;
  favList?: number[];
  disabled?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listData,
  reservation,
  favList,
  onAction,
  actionLabel,
  disabled,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (favList) {
      dispatch(setWholeFavList(favList));
    }
  }, [dispatch, favList]);
  const { getByValue } = useCountries();
  const location = getByValue(listData.locationValue);
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    console.log("reservation", reservation);

    const start = new Date("2022-09-23");
    const end = new Date("2023-10-17");

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);
  return (
    <div>
      <div
        onClick={() => router.push(`/listings/${listData.id}`)}
        className="col-span-1 cursor-pointer group"
      >
        <div className="flex flex-col gap-2 w-full">
          <div
            className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
          >
            <Image
              fill
              className="
              object-cover 
              group-hover:scale-110 
              transition
              h-full
              w-full
            "
              src={listData.imageSrc}
              alt="Listing"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 right-3">
              <HeartButton listingId={listData.id} />
            </div>
          </div>
          <div className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </div>
          <div className="font-light text-neutral-500">
            {reservationDate || listData.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">$ {listData.price}</div>
            {!reservation && <div className="font-light">night</div>}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
