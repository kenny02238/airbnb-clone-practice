import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      name: "My-project",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const body = {
          email: credentials?.email,
        };
        try {
          console.log(credentials);

          const login = await fetch(`${process.env.API_URL}users/login/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const user = await login.json();
          console.log("user", user);

          cookies().set("token", user.access);
          if (user) {
            return user;
          }
          return null;
        } catch (err) {
          console.log(err);
        }
      },
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
    async session({ session, token }) {
      console.log("session", session, token);

      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = "yo";
      // session.refreshToken = "bro";
      // session.idToken = "好奇";
      // session.provider = "砥礪朽死啦";
      // session.id = token.id;
      return session;
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      token.accessToken = "adsf";
      token.refreshToken = "adsf";
      token.idToken = "asdf";
      token.provider = "asdf";
      // if (user) {
      //   token.id = user.id.toString();
      // }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
