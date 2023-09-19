"use client";

import { SafeListing } from "@/app/types";
import HeartButton from "./HeartButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "@/app/types";

interface ListingCardProps {
  listData: SafeListing;
  reservation?: SafeReservation;
  actionId?: string;
  onAction?: (id: string) => void;
  actionLabel?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({ listData, reservation }) => {
  const router = useRouter();
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
