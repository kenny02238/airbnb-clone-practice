export type SafeUser = {
  name?: string;
};

export interface AuthDefaultUserData {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
export interface UserData {
  access?: string;
  id: number | undefined;
  email: string;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
  favorites: any[];
}
export interface GoogleUserData {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
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
