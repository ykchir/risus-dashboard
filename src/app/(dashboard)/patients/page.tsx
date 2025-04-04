"use client";

import { useEffect, useState } from "react";
import PatientsList from "@/components/patients/patients-list";
import { usePatientsStore } from "@/stores/patients";

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
        <p className="text-gray-500">Manage patient records and information</p>
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
