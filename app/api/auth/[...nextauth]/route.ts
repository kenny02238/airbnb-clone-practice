import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("authorize", credentials?.password);

        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: "1",
          name: "kennytest",
          email: "kennytest@example.com",
        };

        if (user) {
          console.log(123);

          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("first________________", session);

      return session;
    },
    async signIn(e) {
      console.log("signIn", e);
      if (e.credentials) {
        console.log("if 條件---------------------------------");
        return true;
      }
      try {
        console.log(" try block ------------------------");

        const foo = await fetch(`${process.env.API_URL}users/social-login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: e.account?.id_token,
          }),
        });
        const res = await foo.json();
        return true;
      } catch (err) {
        console.log(err);
      }

      return "/";
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
