import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import NavBar from "./components/navbar/NavBar";
import "./globals.css";
import { Providers } from "./redux/provider";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Air bnb",
  description: "Air bnb clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <ClientOnly>
            <RegisterModal />
            <NavBar />
          </ClientOnly>
          {children}
        </Providers>
      </body>
    </html>
  );
}
