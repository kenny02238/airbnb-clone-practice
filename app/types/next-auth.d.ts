import NextAuth from "next-auth";
import { JWT, User } from "next-auth/jwt";
import { Session, DefaultSession } from "next-auth";
import Providers from "next-auth/providers";
export interface userData {
  access: string;
  id: number;
  email: string;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
  favorites: any[];
}
declare module "next-auth" {
  interface Profile {
    email_verified: boolean;
  }
  interface Session {
    accessToken: string;
    user: userData | DefaultSession["user"];
  }
  interface User {
    access: string;
    user: userData;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: userData;
    idToken?: string;
    accessToken?: string;
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
