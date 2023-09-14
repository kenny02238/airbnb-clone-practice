export const getListingsByCategory = async () => {
  const res = await fetch(`${process.env.API_URL}listings/`);
  const listings = await res.json();
  return listings;
};
