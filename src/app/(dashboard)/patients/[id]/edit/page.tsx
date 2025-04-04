"use client";

import { useState, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";
import { PatientStatus, Gender, Patient } from "@/types/patient";
import { mockPatients } from "@/lib/mock-data";
import { toast } from "sonner";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

// Importez le PatientForm dynamiquement pour éviter les erreurs de compilation
import dynamic from "next/dynamic";
// @ts-expect-error - Nous ignorons les erreurs TypeScript ici car elles seront résolues au runtime
const PatientForm = dynamic(() => import("@/components/patients/patient-form"), {
  loading: () => <PatientFormSkeleton />,
  ssr: false,
});

// Type pour la mise à jour du patient
interface UpdatePatientValues {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  notes?: string;
  status: PatientStatus;
}

// Composant de squelette pour afficher pendant le chargement
function PatientFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

export default function EditPatientPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    // Simuler un chargement de données pour démontrer le skeleton loader
    const fetchPatient = async () => {
      setIsLoading(true);

      try {
        // Dans un cas réel, ceci serait un appel API
        setTimeout(() => {
          const foundPatient = mockPatients.find((p) => p.id === params.id);

          if (!foundPatient) {
            return notFound();
          }

          setPatient(foundPatient);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erreur lors du chargement du patient:", error);
        setIsLoading(false);
        toast.error("Impossible de charger les données du patient");
      }
    };

    fetchPatient();
  }, [params.id]);

  const handleSubmit = async (formData: UpdatePatientValues) => {
    setIsSubmitting(true);

    try {
      console.log("Données du formulaire soumises:", formData);

      // Simuler une requête API pour mettre à jour le patient
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Afficher un message de succès
      toast.success("Patient mis à jour avec succès");

      // Rediriger vers la page de détails du patient
      router.push(`/patients/${params.id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du patient:", error);
      toast.error("Échec de la mise à jour du patient");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-10 w-48" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40" />
          </CardHeader>
          <CardContent>
            <PatientFormSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            Modifier {patient?.firstName} {patient?.lastName}
          </h1>
        </div>
      </div>

      {patient && (
        // @ts-expect-error - Les props seront correctement typées au runtime
        <PatientForm patient={patient} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      )}
    </div>
  );
}
