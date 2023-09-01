export type SafeUser = {
  name?: string;
};

export type SafeListing = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string;
  price: number;
};
export type SafeReservation = {
  id: string;
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
};
