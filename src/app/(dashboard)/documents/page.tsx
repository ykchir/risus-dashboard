import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Search } from "lucide-react";
import { mockDocuments, mockPatients } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Documents | RISUS",
  description: "Manage patient documents and files",
};

export default function DocumentsPage() {
  // Sort documents by upload date (newest first)
  const sortedDocuments = [...mockDocuments].sort(
    (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()
  );

  // Function to get patient name by ID
  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find((p) => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown Patient";
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-gray-500">Manage patient documents and files</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-[250px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <Link
                href="#"
                className="flex items-center justify-between rounded-md bg-primary/10 px-3 py-2 font-medium text-primary"
              >
                <span>All Documents</span>
                <span className="text-sm text-primary/70">{mockDocuments.length}</span>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-primary/5 hover:text-primary"
              >
                <span>Scans</span>
                <span className="text-sm text-gray-500">
                  {mockDocuments.filter((d) => d.type === "scan").length}
                </span>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-primary/5 hover:text-primary"
              >
                <span>X-Rays</span>
                <span className="text-sm text-gray-500">
                  {mockDocuments.filter((d) => d.type === "x-ray").length}
                </span>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-primary/5 hover:text-primary"
              >
                <span>Treatment Plans</span>
                <span className="text-sm text-gray-500">
                  {mockDocuments.filter((d) => d.type === "pdf").length}
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search documents..." className="pl-8" />
            </div>
            <Tabs defaultValue="grid" className="w-auto">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Tabs defaultValue="grid">
            <TabsContent value="grid" className="mt-0">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedDocuments.map((document) => (
                  <Card key={document.id} className="overflow-hidden">
                    <div className="flex h-40 items-center justify-center bg-gray-100">
                      <FileText className="h-16 w-16 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="line-clamp-1 font-medium">{document.name}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="line-clamp-1">{getPatientName(document.patientId)}</span>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                          {document.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {format(document.uploadedAt, "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-primary hover:bg-primary/5 hover:text-primary"
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-primary hover:bg-primary/5 hover:text-primary"
                        >
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50 text-left">
                          <th className="px-4 py-3 font-medium">Name</th>
                          <th className="px-4 py-3 font-medium">Patient</th>
                          <th className="px-4 py-3 font-medium">Type</th>
                          <th className="px-4 py-3 font-medium">Date</th>
                          <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedDocuments.map((document) => (
                          <tr key={document.id} className="border-b">
                            <td className="px-4 py-3">
                              <Link href="#" className="font-medium text-primary hover:underline">
                                {document.name}
                              </Link>
                            </td>
                            <td className="px-4 py-3">
                              <Link
                                href={`/patients/${document.patientId}`}
                                className="text-primary hover:underline"
                              >
                                {getPatientName(document.patientId)}
                              </Link>
                            </td>
                            <td className="px-4 py-3">
                              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                                {document.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                              {format(document.uploadedAt, "MMM d, yyyy")}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-primary hover:bg-primary/5 hover:text-primary"
                                >
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-primary hover:bg-primary/5 hover:text-primary"
                                >
                                  Download
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
