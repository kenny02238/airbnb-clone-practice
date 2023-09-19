export const getListingsByCategory = async (categories: string) => {
  const res = await fetch(
    `${process.env.API_URL}listings/?category=${categories}`,
    { next: { revalidate: 1 } }
  );

  const listings = await res.json();

  return listings;
};
