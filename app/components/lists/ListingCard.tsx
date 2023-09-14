"use client";

import { SafeListing } from "@/app/types";
import HeartButton from "./HeartButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ListingCardProps {
  listData: SafeListing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listData }) => {
  const router = useRouter();
  const { data } = useSession();
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
              sizes="100vw"
              className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
              src={listData.imageSrc}
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
              <HeartButton listingId={listData.id} currentUser={data?.user} />
            </div>
          </div>
          <div className="font-semibold text-lg">
            {/* {location?.region}, {location?.label} */}
          </div>
          <div className="font-light text-neutral-500">
            {listData.category}
            {/* {reservationDate || listData.category} */}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">$ {listData.price}</div>
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
