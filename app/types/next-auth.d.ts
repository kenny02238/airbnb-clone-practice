import NextAuth from "next-auth";
import { JWT, User } from "next-auth/jwt";
import { Session, DefaultSession } from "next-auth";
import Providers from "next-auth/providers";
import { UserData } from ".";
declare module "next-auth" {
  interface Profile {
    email_verified: boolean;
  }
  interface Session {
    accessToken: string;
    customUser: UserData;
    user: DefaultSession["user"];
  }
  interface User {
    access: string;
    user: UserData;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserData;
    customUser: UserData;
    idToken?: string;
    accessToken: string;
    refreshToken?: string;
    providerId?: string;
  }
  interface User {
    access: string;
  }
}

declare module "next-auth/providers" {
  interface providers {
    provider: provider[];
  }
  interface provider {
    id?: string;
    name?: string;
  }
}
