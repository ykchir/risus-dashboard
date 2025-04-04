"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronDown, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Patient, PatientStatus } from "@/types/patient";

// Menu component extracted to prevent re-renders causing freezes
const ActionMenu = ({ patient }: { patient: Patient }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/patients/${patient.id}`} className="w-full cursor-pointer">
            View details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/patients/${patient.id}/edit`} className="w-full cursor-pointer">
            Edit patient
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/patients/${patient.id}/documents`} className="w-full cursor-pointer">
            View documents
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Define the columns for the table
const columns: ColumnDef<Patient>[] = [
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "name",
    header: "Patient Name",
    cell: ({ row }) => (
      <div>
        <Link
          href={`/patients/${row.original.id}`}
          className="font-medium text-blue-600 hover:underline"
        >
          {row.original.firstName} {row.original.lastName}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ row }) => format(row.original.dateOfBirth, "MMM d, yyyy"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        [PatientStatus.ACTIVE]: "bg-green-100 text-green-800",
        [PatientStatus.PENDING]: "bg-yellow-100 text-yellow-800",
        [PatientStatus.COMPLETED]: "bg-blue-100 text-blue-800",
        [PatientStatus.CANCELED]: "bg-red-100 text-red-800",
      };

      return (
        <div className="flex w-full items-center">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionMenu patient={row.original} />,
  },
];

interface PatientsListProps {
  patients: Patient[];
  isLoading?: boolean;
  searchQuery?: string;
  statusFilter?: string;
  onSearchChange?: (value: string) => void;
  // Not currently used but kept for API consistency
  onStatusFilterChange?: (value: string) => void;
}

export default function PatientsList({
  patients,
  isLoading = false,
  searchQuery = "",
  statusFilter = "",
  onSearchChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onStatusFilterChange,
}: PatientsListProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Sync local state with props
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Handle search input change - memoized to prevent unnecessary re-renders
  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearchQuery(value);
      if (onSearchChange) {
        onSearchChange(value);
      }
    },
    [onSearchChange]
  );

  // Filter patients based on search query and status - memoized to prevent unnecessary calculations
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // Filter by search query
      if (localSearchQuery) {
        const searchLower = localSearchQuery.toLowerCase();
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();

        const matchesSearch =
          fullName.includes(searchLower) ||
          patient.email.toLowerCase().includes(searchLower) ||
          patient.phone?.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Filter by status
      if (statusFilter && statusFilter !== "all") {
        return patient.status === statusFilter;
      }

      return true;
    });
  }, [patients, localSearchQuery, statusFilter]);

  // Use the filtered data directly without additional state
  const table = useReactTable({
    data: filteredPatients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    // Disable automatic resets which can cause infinite loops
    autoResetPageIndex: false,
  });

  if (isLoading) {
    return <div className="py-4 text-center">Loading patients...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="w-full md:w-64">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={localSearchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => router.push("/patients/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          -
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            filteredPatients.length
          )}{" "}
          of {filteredPatients.length}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
