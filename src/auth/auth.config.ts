/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { mockUsers } from "./index";

// Login schema using zod for validation
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

// Use a more generic type for simplicity since this is a temporary auth config
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }: { auth: any; request: any }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      const isOnPractitioners = request.nextUrl.pathname.startsWith("/practitioners");
      const isOnPatients = request.nextUrl.pathname.startsWith("/patients");
      const isOnAdmin = request.nextUrl.pathname.startsWith("/admin");

      // Public routes are always accessible
      if (!isOnDashboard && !isOnPractitioners && !isOnPatients && !isOnAdmin) {
        return true;
      }

      // Protected routes require authentication
      if (!isLoggedIn) {
        return false;
      }

      // Admin routes check
      if (isOnAdmin && auth?.user?.role !== "admin") {
        return false;
      }

      return true;
    },
    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-expect-error - Ignoring authorize type issues
      async authorize(credentials) {
        if (!credentials) return null;

        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email } = parsedCredentials.data;

          // For development purposes, accept any password for mock users
          const user = mockUsers.find((user) => user.email === email);

          if (!user) return null;

          // In production, you would verify the password here

          return user;
        }

        return null;
      },
    }),
  ],
} as const;
