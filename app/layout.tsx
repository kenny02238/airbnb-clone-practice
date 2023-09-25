import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import UploadToAirbnbModal from "./components/modals/uploadToAirBnbBodyContent/UploadToAirbnbModal";
import FavoriteModal from "./components/modals/FavoriteModal";
import SearchModal from "./components/modals/SearchModal";
import NavBar from "./components/navbar/NavBar";
import "./globals.css";
import { Providers } from "./redux/provider";
import { Nunito } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Air bnb",
  description: "Air bnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers session={session}>
          <RegisterModal />
          <LoginModal />
          <SearchModal />
          <UploadToAirbnbModal />
          <FavoriteModal />
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
