import Container from "./components/Container";
import ListingCard from "./components/lists/ListingCard";
import house from "@/public/images/house.jpg";

const listings = [
  {
    id: "1",
    title: "Test Room",
    description: "Test Room Description",
    imageSrc: `${house.src}`,
    createdAt: "",
    category: "Test Category",
    roomCount: "2",
    bathroomCount: "3",
    guestCount: "3",
    locationValue: "",
    userId: "Test User Id",
    price: "80000",
  },
  {
    id: "2",
    title: "Test Room",
    description: "Test Room Description",
    imageSrc: `${house.src}`,
    createdAt: "",
    category: "Test Category",
    roomCount: "2",
    bathroomCount: "3",
    guestCount: "3",
    locationValue: "",
    userId: "Test User Id",
    price: "80000",
  },
  {
    id: "3",
    title: "Test Room",
    description: "Test Room Description",
    imageSrc: `${house.src}`,
    createdAt: "",
    category: "Test Category",
    roomCount: "2",
    bathroomCount: "3",
    guestCount: "3",
    locationValue: "",
    userId: "Test User Id",
    price: "80000",
  },
  {
    id: "4",
    title: "Test Room",
    description: "Test Room Description",
    imageSrc: `${house.src}`,
    createdAt: "",
    category: "Test Category",
    roomCount: "2",
    bathroomCount: "3",
    guestCount: "3",
    locationValue: "",
    userId: "Test User Id",
    price: "80000",
  },
  {
    id: "5",
    title: "Test Room",
    description: "Test Room Description",
    imageSrc: `${house.src}`,
    createdAt: "",
    category: "Test Category",
    roomCount: "2",
    bathroomCount: "3",
    guestCount: "3",
    locationValue: "",
    userId: "Test User Id",
    price: "80000",
  },
  {
    id: "6",
    title: "Test Room",
    description: "Test Room Description",
    imageSrc: `${house.src}`,
    createdAt: "",
    category: "Test Category",
    roomCount: "2",
    bathroomCount: "3",
    guestCount: "3",
    locationValue: "",
    userId: "Test User Id",
    price: "80000",
  },
  {
    id: "7",
    title: "Test Room",
    description: "Test Room Description",
    imageSrc: `${house.src}`,
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

interface ISearchParams {
  category: string;
}
const Home = async ({ searchParams }: { searchParams: ISearchParams }) => {
  //TODO 這邊要拿searchParams.category去切換頁面
  return (
    <Container>
      <div
        className="
            pt-[200px]
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-4
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
};

export default Home;
