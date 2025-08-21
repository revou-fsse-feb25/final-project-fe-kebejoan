import { getSession } from "next-auth/react";

export async function sessionFn() {
  return await getSession();
}
