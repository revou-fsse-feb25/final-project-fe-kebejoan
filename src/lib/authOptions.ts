import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole, Department } from "@/types/tableTypes";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        code: { label: "Code", type: "text", placeholder: "Enter code" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.code || !credentials?.password) {
          return null;
        }

        try {
          // 👇 call your backend API for login
          const response = await fetch(
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

          if (!response.ok) return null;
          const data = await response.json();

          // Example: data = { access_token, user: { id, code, role, avatar } }
          return {
            id: data.user.id,
            name: data.user.name,
            code: data.user.code,
            role: data.user.role,
            dept: data.user.dept,
            accessToken: data.access_token,
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
      if (user) {
        token.id = user.id as number;
        token.code = (user as any).code;
        token.role = (user as any).userRole;
        token.dept = (user as any).dept;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.code = token.code as string;
        session.user.role = token.role as UserRole;
        session.user.dept = token.dept as Department;
        session.user.name = token.name as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  //     cookies: {
  //     sessionToken: {
  //         name: process.env.NODE_ENV === "production"
  //             ? "__Secure-next-auth.session-token"
  //             : "next-auth.session-token",
  //         options: {
  //             httpOnly: true,
  //             sameSite: "lax",
  //             path: "/",
  //             secure: process.env.NODE_ENV === "production",
  //         },
  //     },
  // },
};
