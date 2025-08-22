import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole, Department } from "@/types/tableTypes";
import { JWT } from "next-auth/jwt";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refresh_token: token.refreshToken,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to refresh token");
    const refreshed = await response.json();

    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      refreshToken: refreshed.refresh_token ?? token.refreshToken, // fallback to old refreshToken
    } as JWT;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        code: { label: "Code", type: "text", placeholder: "Enter code" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.code || !credentials?.password) return null;

        try {
          const authenticate = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                code: credentials.code,
                password: credentials.password,
              }),
            }
          );

          if (!authenticate.ok) return null;
          const authorized = await authenticate.json();

          // authorized should contain both access + refresh tokens
          const { access_token, refresh_token, expires_in } = authorized;

          const getUserMe = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );

          if (!getUserMe.ok) return null;
          const user = await getUserMe.json();

          return {
            id: user.id,
            name: user.name,
            code: user.code,
            role: user.userRole,
            dept: user.dept,
            accessToken: access_token,
            refreshToken: refresh_token,
            accessTokenExpires: Date.now() + expires_in * 10,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          id: user.id,
          code: user.code,
          role: user.role as UserRole,
          dept: user.dept as Department,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        } as JWT;
      }

      // Return token if still valid
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Otherwise, refresh it
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.code = token.code as string;
        session.user.role = token.role as UserRole;
        session.user.dept = token.dept as Department;
        session.user.name = token.name as string;
      }
      session.accessToken = token.accessToken as string;
      session.error = token.error as string | undefined;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
