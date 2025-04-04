import { UserRole } from "@/auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    image?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}
