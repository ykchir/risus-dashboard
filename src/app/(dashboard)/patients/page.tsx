"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon, Upload } from "lucide-react";
import PatientsList from "@/components/patients/patients-list";
import { usePatientsStore } from "@/stores/patients";
import { useEffect, useState } from "react";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const fetchPatients = usePatientsStore((state) => state.fetchPatients);
  const patients = usePatientsStore((state) => state.patients);
  const isLoading = usePatientsStore((state) => state.isLoading);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-gray-500">Manage patient records and information</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="#">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Link>
          </Button>
          <Button asChild>
            <Link href="/patients/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              Nouveau Patient
            </Link>
          </Button>
        </div>
      </div>

      <PatientsList
        patients={patients}
        isLoading={isLoading}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={(value) => setSearchQuery(value)}
        onStatusFilterChange={(value) => setStatusFilter(value)}
      />
    </div>
  );
}
