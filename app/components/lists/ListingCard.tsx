"use client";

import { SafeUser, SafeListing } from "@/app/types";
import HeartButton from "./HeartButton";
import Image from "next/image";

interface ListingCardProps {
  currentUser: SafeUser;
  data: SafeListing;
}

const ListingCard: React.FC<ListingCardProps> = ({ currentUser, data }) => {
  return (
    <div>
      <div
        //   onClick={() => router.push(`/listings/${data.id}`)}
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
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
              src={data.imageSrc}
              alt="Listing"
              priority
            />
            <div
              className="
            absolute
            top-3
            right-3
          "
            >
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          </div>
          <div className="font-semibold text-lg">
            {/* {location?.region}, {location?.label} */}
          </div>
          <div className="font-light text-neutral-500">
            {data.category}
            {/* {reservationDate || data.category} */}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">$ {data.price}</div>
            {/* {!reservation && (
              )} */}
            <div className="font-light">night</div>
          </div>
          {/* {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )} */}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
