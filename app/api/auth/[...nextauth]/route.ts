import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
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
        try {
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

  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      console.log("---------session", session, token, user);
      session.accessToken = token.accessToken;
      session.customUser = token.customUser;
      return session;
    },
    async jwt({ user, token, account }) {
      console.log("account", account);
      console.log("---------jwt");

      if (account?.type === "credentials") {
        token.accessToken = user.access;
        token.customUser = user.user;
        return token;
      }

      if (account?.provider === "google") {
        try {
          const login = await fetch(
            `${process.env.API_URL}users/social-login/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                access_token: account.id_token,
              }),
            }
          );

          const user = await login.json();
          token.user = user.user;
          token.accessToken = user.access;
        } catch (err) {
          console.log("socialErr", err);
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
