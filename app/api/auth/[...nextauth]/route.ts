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
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log(credentials);

          const login = await fetch(`${process.env.API_URL}users/login/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.username,
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
    async signIn(e) {
      if (e.credentials) {
        cookies().set("token", "asjdhflkjashdlkjfhlasjdf");
        return "/?category=Countryside";
      }
      try {
        const socialLogin = await fetch(
          `${process.env.API_URL}users/social-login/`,
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
        const res = await socialLogin.json();
        cookies().set("token", res.access);
        return true;
      } catch (err) {
        console.log(err);
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
