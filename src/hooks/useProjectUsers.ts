"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/services/api/api.users";
import { User } from "@/types/tableTypes";
import { AuthState } from "./useAuth";
export function useProjectUsers(auth: AuthState) {
  const [PMs, setPMs] = useState<User[]>();
  const [SEs, setSEs] = useState<User[]>();
  const [PEs, setPEs] = useState<User[]>();

  useEffect(() => {
    if (!auth.isAuth) {
      (async () => {
        setPMs(await fetchUsers());
        setSEs(await fetchUsers());
        setPEs(await fetchUsers());
      })();
    }
  }, [auth.isAuth]);

  return { PMs, SEs, PEs };
}
