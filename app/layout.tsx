import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import UploadToAirbnbModal from "./components/modals/UploadToAirbnbModal";
import NavBar from "./components/navbar/NavBar";
import "./globals.css";
import { Providers } from "./redux/provider";
import { Nunito } from "next/font/google";
import { getServerSession } from "next-auth";

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
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers session={session}>
          <RegisterModal />
          <LoginModal />
          <UploadToAirbnbModal />
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
