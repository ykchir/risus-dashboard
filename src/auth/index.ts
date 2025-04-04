import { z } from "zod";

// Define user roles
export enum UserRole {
  ADMIN = "admin",
  PRACTITIONER = "practitioner",
  PATIENT = "patient",
}

// Define user schema with zod
export const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// Initial users for development (will be replaced with database)
export const mockUsers: User[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@risus.com",
    role: UserRole.ADMIN,
    image: "/avatars/admin.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "practitioner-1",
    name: "Dr. Yassine  Kchir",
    email: "dr.kchir@risus.com",
    role: UserRole.PRACTITIONER,
    image: "/avatars/doctor.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Helper functions to check user roles
export const isAdmin = (user?: User | null) => user?.role === UserRole.ADMIN;
export const isPractitioner = (user?: User | null) => user?.role === UserRole.PRACTITIONER;
export const isPatient = (user?: User | null) => user?.role === UserRole.PATIENT;
