import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
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
            {/* <Modal isOpen /> */}
            <NavBar />
          </ClientOnly>
          {children}
        </Providers>
      </body>
    </html>
  );
}
