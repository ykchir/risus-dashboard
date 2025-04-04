import { Metadata } from "next";
import PatientForm from "@/components/patients/patient-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "New Patient | RISUS",
  description: "Add a new patient to your practice",
};

export default function NewPatientPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Patient</h1>
        <p className="text-gray-500">Create a new patient record</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>
            Enter the patient&apos;s personal and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PatientForm />
        </CardContent>
      </Card>
    </div>
  );
}
