import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole } from "@/auth";

// Sample users for development
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: UserRole.ADMIN,
    image: "/avatars/doctor.png",
  },
  {
    id: "2",
    name: "Dr. John Smith",
    email: "doctor@example.com",
    password: "password",
    role: UserRole.PRACTITIONER,
    image: "/avatars/doctor.png",
  },
  {
    id: "3",
    name: "Patient User",
    email: "patient@example.com",
    password: "password",
    role: UserRole.PATIENT,
    image: "/avatars/doctor.png",
  },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find(
          (user) => user.email === credentials.email && user.password === credentials.password
        );

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
});

export { handler as GET, handler as POST };
