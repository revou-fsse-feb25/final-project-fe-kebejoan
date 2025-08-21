// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { UserRole, Department } from "@/types/tableTypes";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      code: string;
      name: string;
      role: UserRole;
      dept: Department;
    } & DefaultSession["user"];
    accessToken?: string;
    error?: string;
  }

  interface User extends DefaultUser {
    id: number;
    code: string;
    name: string;
    role: UserRole;
    dept: Department;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    code: string;
    name?: string;
    role: UserRole;
    dept: Department;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
