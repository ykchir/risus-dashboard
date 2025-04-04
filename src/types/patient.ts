import { TreatmentStatus } from "./treatment";
import { z } from "zod";

export enum PatientStatus {
  ACTIVE = "Active",
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
}

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: Gender | string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  notes?: string;
  status: PatientStatus;
  createdAt: Date;
}

export const CreatePatientSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.string(), // Will be transformed to Date in the form
  gender: z.nativeEnum(Gender),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  status: z.nativeEnum(PatientStatus).default(PatientStatus.PENDING),
});

export interface Treatment {
  id: string;
  patientId: string;
  treatmentType: string;
  startDate: Date;
  estimatedEndDate?: Date;
  status: TreatmentStatus;
  notes?: string;
}

export interface Document {
  id: string;
  patientId: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

export interface Message {
  id: string;
  patientId: string;
  senderId: string;
  receiverId?: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}
