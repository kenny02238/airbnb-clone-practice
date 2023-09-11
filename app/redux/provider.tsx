"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "./store";

interface ProvidersProps {
  children: React.ReactNode;
  session: any;
}

export const Providers: React.FC<ProvidersProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>{children}</Provider>;
    </SessionProvider>
  );
};
