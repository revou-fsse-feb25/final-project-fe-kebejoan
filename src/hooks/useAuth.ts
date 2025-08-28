// hooks/useAuth.ts
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import axios, { AxiosInstance } from "axios";
import { UserRole } from "@/types/tableTypes";
import { Session } from "next-auth";

export type AuthState = {
  isAuth: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  token?: string;
  axiosAuth?: AxiosInstance;
};

interface useAuthReturn {
  auth: AuthState;
  session: Session | null;
  user: Session["user"] | undefined;
}

export function useAuth(): useAuthReturn {
  const { data: session, status } = useSession();
  const [auth, setAuth] = useState<AuthState>({
    isAuth: false,
    isAdmin: false,
    isLoading: true,
    token: undefined,
    axiosAuth: undefined,
  });

  // Create axios with token whenever session changes
  const axiosAuth = useMemo(() => {
    if (!session?.accessToken) return undefined;
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
  }, [session?.accessToken, session?.user]);

  useEffect(() => {
    if (status === "loading") {
      setAuth((prev) => ({ ...prev, isLoading: true }));
      return;
    }

    if (status === "unauthenticated") {
      setAuth({
        isAuth: false,
        isAdmin: false,
        isLoading: false,
        token: undefined,
        axiosAuth: undefined,
      });
      return;
    }

    if (status === "authenticated") {
      const token = session?.accessToken;
      const isAdmin = session?.user?.role === UserRole.ADMIN;

      setAuth({
        isAuth: true,
        isAdmin,
        isLoading: false,
        token,
        axiosAuth,
      });
    }
  }, [status, session, axiosAuth]);

  return {
    auth,
    session,
    user: session?.user,
  };
}
