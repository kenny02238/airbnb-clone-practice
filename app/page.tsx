import Container from "./components/Container";
import ListingCard from "./components/lists/ListingCard";
import Dog from "@/public/images/logo.png";

const listings = [
  {
    id: "1",
    title: "Test Room",
    description: "Test Room Description",
    imageSrc: `${Dog.src}`,
    createdAt: "",
    category: "Test Category",
    roomCount: "2",
    bathroomCount: "3",
    guestCount: "3",
    locationValue: "",
    userId: "Test User Id",
    price: "80000",
  },
];

export default function Home() {
  return (
    <Container>
      <div
        className="
            pt-[181px]
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
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={{ name: "kenny" }}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
}
