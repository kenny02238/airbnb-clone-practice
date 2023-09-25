interface GetSearchListingsState {
  bathroomCount?: string;
  endDate?: string;
  guestCount?: string;
  locationValue?: string;
  roomCount?: string;
  startDate?: string;
  search: string;
}

export const getSearchListings = async (categories: GetSearchListingsState) => {
  const url = Object.entries(categories)
    .filter(([key]) => key !== "search")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const res = await fetch(`${process.env.API_URL}listings/?${url}`);
  const listings = await res.json();
  return listings;
};
