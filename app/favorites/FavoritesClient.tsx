"use client";

import Container from "@/app/components/Container";
import { SafeListing } from "@/app/types";
import Heading from "../components/Heading";
import ListingCard from "../components/lists/ListingCard";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setWholeFavList } from "../redux/features/userSession/userSessionSlice";
import { useEffect, useState } from "react";
import { intersection } from "lodash-es";

interface FavoritesClientProps {
  listings?: SafeListing[] | null | any;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings }) => {
  const dispatch = useAppDispatch();
  const liveFavoriteListings = useAppSelector(
    (state) => state.userSessionSlice.userFavoriteList
  );
  const [liveFavorites, setLiveFavorites] = useState<SafeListing[] | null>(
    listings
  );
  useEffect(() => {
    if (listings) {
      dispatch(setWholeFavList(listings?.map((item: SafeListing) => item.id)));
    }
  }, [dispatch, listings]);
  useEffect(() => {
    if (!liveFavoriteListings || !listings) {
      return;
    }
    const filteredArray = listings.filter((item: SafeListing) =>
      liveFavoriteListings.includes(item.id)
    );
    setLiveFavorites(filteredArray);
  }, [liveFavoriteListings, listings]);
  return (
    <div>
      <Container>
        <Heading title="Favorites" subtitle="List of places you favorite!" />
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
          {liveFavorites &&
            liveFavorites.map((listing: any) => (
              <ListingCard key={listing.id} listData={listing} />
            ))}
        </div>
      </Container>
    </div>
  );
};

export default FavoritesClient;
