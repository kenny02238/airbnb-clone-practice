import { lazy } from "react";
// import LoginModal from "./components/modals/LoginModal";
// import RegisterModal from "./components/modals/RegisterModal";
// import UploadToAirbnbModal from "./components/modals/UploadToAirbnbModal";
import NavBar from "./components/navbar/NavBar";
import "./globals.css";
import { Providers } from "./redux/provider";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Air bnb",
  description: "Air bnb clone",
};

const LoginModal = lazy(() => import("@/app/components/modals/LoginModal"));
const RegisterModal = lazy(
  () => import("@/app/components/modals/RegisterModal")
);
const UploadToAirbnbModal = lazy(
  () => import("@/app/components/modals/UploadToAirbnbModal")
);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <RegisterModal />
          <LoginModal />
          <UploadToAirbnbModal />
          <NavBar currentUser={{ name: "Kenny" }} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
