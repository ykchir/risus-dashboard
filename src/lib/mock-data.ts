import { Patient, Treatment, Document, Message, PatientStatus, Gender } from "@/types/patient";
import { TreatmentStatus } from "@/types/treatment";

// Function to generate a unique ID
function generateId(prefix: string = ""): string {
  return `${prefix}${Math.random().toString(36).substring(2, 10)}`;
}

// Mock patients data
export const mockPatients: Patient[] = [
  {
    id: "p1",
    firstName: "Anis",
    lastName: "Dhahbi",
    email: "anis.dhahbi@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: new Date("1985-03-15"),
    gender: Gender.MALE,
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    country: "USA",
    status: PatientStatus.ACTIVE,
    createdAt: new Date("2023-01-10"),
    notes: "Patient has mild dental crowding in the lower arch. No allergies reported.",
  },
  {
    id: "p2",
    firstName: "Khalil",
    lastName: "Issa",
    email: "khalil.issa@example.com",
    phone: "+1 (555) 987-6543",
    dateOfBirth: new Date("1990-07-22"),
    gender: Gender.FEMALE,
    address: "456 Oak Ave",
    city: "Los Angeles",
    state: "CA",
    postalCode: "90001",
    country: "USA",
    status: PatientStatus.ACTIVE,
    createdAt: new Date("2023-02-05"),
    notes: "Patient has moderate dental spacing. Reported sensitivity to whitening agents.",
  },
  {
    id: "p3",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    dateOfBirth: new Date("1975-11-08"),
    gender: Gender.MALE,
    address: "789 Pine St",
    city: "Seattle",
    state: "WA",
    postalCode: "98101",
    country: "USA",
    status: PatientStatus.PENDING,
    createdAt: new Date("2023-03-20"),
    notes: "Patient has previous orthodontic treatment. Looking for minor adjustment.",
  },
  {
    id: "p4",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 345-6789",
    dateOfBirth: new Date("1988-05-17"),
    gender: Gender.FEMALE,
    address: "101 Maple Rd",
    city: "Chicago",
    state: "IL",
    postalCode: "60007",
    country: "USA",
    status: PatientStatus.COMPLETED,
    createdAt: new Date("2022-11-15"),
    notes: "Full course of treatment completed. Very satisfied with results.",
  },
  {
    id: "p5",
    firstName: "Thomas",
    lastName: "Wilson",
    email: "thomas.wilson@example.com",
    phone: "+1 (555) 456-7890",
    dateOfBirth: new Date("1992-09-30"),
    gender: Gender.MALE,
    address: "222 Cedar Ln",
    city: "Boston",
    state: "MA",
    postalCode: "02108",
    country: "USA",
    status: PatientStatus.ACTIVE,
    createdAt: new Date("2023-04-02"),
    notes: "Patient has mild overbite. No previous orthodontic treatment.",
  },
];

// Mock treatments data
export const mockTreatments: Treatment[] = [
  {
    id: generateId(),
    patientId: "p1",
    treatmentType: "Clear Aligners - Full Course",
    status: TreatmentStatus.IN_PROGRESS,
    startDate: new Date("2023-01-20"),
    estimatedEndDate: new Date("2023-10-20"),
    notes: "16 sets of aligners. Currently on set 7. Tracking well with treatment plan.",
  },
  {
    id: generateId(),
    patientId: "p2",
    treatmentType: "Clear Aligners - Full Course",
    status: TreatmentStatus.IN_PROGRESS,
    startDate: new Date("2023-02-15"),
    estimatedEndDate: new Date("2023-12-15"),
    notes: "20 sets of aligners. Currently on set 5. Some issues with compliance.",
  },
  {
    id: generateId(),
    patientId: "p3",
    treatmentType: "Clear Aligners - Limited",
    status: TreatmentStatus.PLANNED,
    startDate: new Date("2023-04-10"),
    estimatedEndDate: new Date("2023-08-10"),
    notes: "8 sets of aligners planned. Awaiting final approval.",
  },
  {
    id: generateId(),
    patientId: "p4",
    treatmentType: "Clear Aligners - Full Course",
    status: TreatmentStatus.COMPLETED,
    startDate: new Date("2022-12-01"),
    estimatedEndDate: new Date("2023-09-01"),
    notes: "18 sets of aligners. Completed ahead of schedule. Excellent compliance.",
  },
  {
    id: generateId(),
    patientId: "p5",
    treatmentType: "Clear Aligners - Full Course",
    status: TreatmentStatus.IN_PROGRESS,
    startDate: new Date("2023-04-15"),
    estimatedEndDate: new Date("2024-01-15"),
    notes: "22 sets of aligners. Currently on set 1. Just beginning treatment.",
  },
];

// Mock documents data
export const mockDocuments: Document[] = [
  {
    id: generateId(),
    patientId: "p1",
    name: "Initial Scan - John Doe",
    type: "scan",
    uploadedAt: new Date("2023-01-15"),
    url: "/mock-files/scan1.stl",
  },
  {
    id: generateId(),
    patientId: "p1",
    name: "Treatment Plan - John Doe",
    type: "pdf",
    uploadedAt: new Date("2023-01-18"),
    url: "/mock-files/treatment-plan1.pdf",
  },
  {
    id: generateId(),
    patientId: "p2",
    name: "Initial Scan - Jane Smith",
    type: "scan",
    uploadedAt: new Date("2023-02-10"),
    url: "/mock-files/scan2.stl",
  },
  {
    id: generateId(),
    patientId: "p2",
    name: "X-Ray - Jane Smith",
    type: "x-ray",
    uploadedAt: new Date("2023-02-08"),
    url: "/mock-files/xray1.jpg",
  },
  {
    id: generateId(),
    patientId: "p3",
    name: "Initial Scan - Michael Chen",
    type: "scan",
    uploadedAt: new Date("2023-03-25"),
    url: "/mock-files/scan3.stl",
  },
  {
    id: generateId(),
    patientId: "p4",
    name: "Final Scan - Sarah Johnson",
    type: "scan",
    uploadedAt: new Date("2023-08-30"),
    url: "/mock-files/scan4-final.stl",
  },
  {
    id: generateId(),
    patientId: "p5",
    name: "Initial Scan - Thomas Wilson",
    type: "scan",
    uploadedAt: new Date("2023-04-05"),
    url: "/mock-files/scan5.stl",
  },
  {
    id: generateId(),
    patientId: "p5",
    name: "X-Ray - Thomas Wilson",
    type: "x-ray",
    uploadedAt: new Date("2023-04-03"),
    url: "/mock-files/xray2.jpg",
  },
];

// Mock messages data
export const mockMessages: Message[] = [
  {
    id: generateId(),
    patientId: "p1",
    senderId: "practitioner-1",
    receiverId: "admin-1",
    content:
      "Can we adjust the treatment plan for John? He's having some discomfort with the current set.",
    createdAt: new Date("2023-03-10T10:30:00"),
    isRead: true,
  },
  {
    id: generateId(),
    patientId: "p1",
    senderId: "admin-1",
    receiverId: "practitioner-1",
    content: "I've reviewed the plan. Let's schedule a quick call to discuss adjustment options.",
    createdAt: new Date("2023-03-10T11:45:00"),
    isRead: true,
  },
  {
    id: generateId(),
    patientId: "p2",
    senderId: "practitioner-1",
    receiverId: "admin-1",
    content: "Jane is having compliance issues. Could we send her some reminder materials?",
    createdAt: new Date("2023-04-05T09:15:00"),
    isRead: true,
  },
  {
    id: generateId(),
    patientId: "p2",
    senderId: "admin-1",
    receiverId: "practitioner-1",
    content: "Yes, I'll send the compliance guide and schedule a follow-up reminder.",
    createdAt: new Date("2023-04-05T10:20:00"),
    isRead: false,
  },
  {
    id: generateId(),
    patientId: "p3",
    senderId: "practitioner-1",
    receiverId: "admin-1",
    content: "Michael's scans look good. Can we proceed with the treatment plan?",
    createdAt: new Date("2023-03-27T14:05:00"),
    isRead: true,
  },
  {
    id: generateId(),
    patientId: "p3",
    senderId: "admin-1",
    receiverId: "practitioner-1",
    content:
      "Plan looks good. I've initiated the aligner production. Estimated delivery in 2 weeks.",
    createdAt: new Date("2023-03-28T11:30:00"),
    isRead: true,
  },
];
