import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(e) {
      try {
        const foo = await fetch(
          "http://192.168.68.118:8000/users/dj-rest-auth/hello/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: e.account?.id_token,
            }),
          }
        );
        const res = await foo.json();
        return "/daniel";
      } catch (err) {
        console.log(err);
      }
      return "/";
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
