import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarRange, FileText, MessageSquare, PenLine, User } from "lucide-react";
import { mockPatients, mockTreatments, mockDocuments, mockMessages } from "@/lib/mock-data";
import { PatientStatus } from "@/types/patient";

export const metadata: Metadata = {
  title: "Patient Details | RISUS",
  description: "View patient details and treatment information",
};

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
  const patient = mockPatients.find((p) => p.id === params.id);

  if (!patient) {
    return notFound();
  }

  const treatments = mockTreatments.filter((t) => t.patientId === patient.id);
  const documents = mockDocuments.filter((d) => d.patientId === patient.id);
  const messages = mockMessages.filter((m) => m.patientId === patient.id);

  const statusColors = {
    [PatientStatus.ACTIVE]: "bg-green-100 text-green-800",
    [PatientStatus.PENDING]: "bg-yellow-100 text-yellow-800",
    [PatientStatus.COMPLETED]: "bg-blue-100 text-blue-800",
    [PatientStatus.CANCELED]: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {patient.firstName} {patient.lastName}
          </h1>
          <p className="text-gray-500">Patient details and treatment information</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/patients/${patient.id}/edit`}>
              <PenLine className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/patients">Back to Patients</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Patient Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <User className="h-12 w-12 text-gray-400" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[patient.status]}`}
                >
                  {patient.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Patient ID</span>
                <span className="text-sm">{patient.id}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Created</span>
                <span className="text-sm">{format(patient.createdAt, "MMM d, yyyy")}</span>
              </div>
            </div>

            <div className="space-y-1 border-t pt-4">
              <h4 className="text-sm font-medium">Contact Information</h4>
              <div className="grid grid-cols-[100px_1fr] gap-1 text-sm">
                <span className="text-gray-500">Email:</span>
                <span>{patient.email}</span>

                <span className="text-gray-500">Phone:</span>
                <span>{patient.phone || "N/A"}</span>

                <span className="text-gray-500">Address:</span>
                <span>{patient.address || "N/A"}</span>

                <span className="text-gray-500">City:</span>
                <span>{patient.city || "N/A"}</span>

                <span className="text-gray-500">State:</span>
                <span>{patient.state || "N/A"}</span>

                <span className="text-gray-500">Postal Code:</span>
                <span>{patient.postalCode || "N/A"}</span>

                <span className="text-gray-500">Country:</span>
                <span>{patient.country || "N/A"}</span>
              </div>
            </div>

            <div className="space-y-1 border-t pt-4">
              <h4 className="text-sm font-medium">Personal Information</h4>
              <div className="grid grid-cols-[100px_1fr] gap-1 text-sm">
                <span className="text-gray-500">Date of Birth:</span>
                <span>{format(patient.dateOfBirth, "MMM d, yyyy")}</span>

                <span className="text-gray-500">Gender:</span>
                <span>{patient.gender}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Notes</CardTitle>
                  <CardDescription>Medical history and important information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border p-4">
                    <p>{patient.notes || "No notes available for this patient."}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Treatment Status</CardTitle>
                    <CalendarRange className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    {treatments.length > 0 ? (
                      <div className="space-y-4">
                        {treatments.map((treatment) => (
                          <div key={treatment.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{treatment.treatmentType}</p>
                              <p className="text-sm text-gray-500">
                                {format(treatment.startDate, "MMM d, yyyy")}
                              </p>
                            </div>
                            <div className="h-2 rounded-full bg-gray-100">
                              <div className="h-full w-[45%] rounded-full bg-blue-500" />
                            </div>
                            <p className="text-xs text-gray-500">{treatment.notes}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No treatments found for this patient.</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    {messages.length > 0 ? (
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div key={message.id} className="rounded-md border p-3">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                {message.senderId === "admin-1" ? "Admin" : "Dr. Smith"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {format(message.createdAt, "MMM d, yyyy")}
                              </p>
                            </div>
                            <p className="mt-1 text-sm">{message.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No messages for this patient.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="treatments">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment History</CardTitle>
                  <CardDescription>All treatments for this patient</CardDescription>
                </CardHeader>
                <CardContent>
                  {treatments.length > 0 ? (
                    <div className="space-y-6">
                      {treatments.map((treatment) => (
                        <div key={treatment.id} className="rounded-md border p-4">
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{treatment.treatmentType}</h3>
                              <p className="text-sm text-gray-500">ID: {treatment.id}</p>
                            </div>
                            <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                              {treatment.status}
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Start Date</p>
                              <p className="text-sm">
                                {format(treatment.startDate, "MMM d, yyyy")}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Estimated End Date
                              </p>
                              <p className="text-sm">
                                {treatment.estimatedEndDate
                                  ? format(treatment.estimatedEndDate, "MMM d, yyyy")
                                  : "Not specified"}
                              </p>
                            </div>

                            <div className="md:col-span-2">
                              <p className="text-sm font-medium text-gray-500">Notes</p>
                              <p className="text-sm">{treatment.notes || "No notes available."}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center">
                      <p className="text-gray-500">No treatments found for this patient.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Patient Documents</CardTitle>
                      <CardDescription>Scans, X-rays, and clinical files</CardDescription>
                    </div>
                    <Button size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {documents.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {documents.map((document) => (
                        <div key={document.id} className="rounded-md border p-4">
                          <div className="mb-2 flex h-32 items-center justify-center rounded bg-gray-100">
                            <FileText className="h-12 w-12 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">{document.name}</h3>
                            <p className="text-sm text-gray-500">{document.type}</p>
                            <p className="text-xs text-gray-500">
                              Uploaded on {format(document.uploadedAt, "MMM d, yyyy")}
                            </p>
                          </div>
                          <div className="mt-2 flex space-x-2">
                            <Button variant="outline" size="sm" className="w-full">
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="w-full">
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center">
                      <p className="text-gray-500">No documents found for this patient.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Communication</CardTitle>
                  <CardDescription>Messages between practitioner and administrator</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[500px] flex-col rounded-md border">
                    <div className="flex-1 overflow-y-auto p-4">
                      {messages.length > 0 ? (
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${
                                message.senderId === "practitioner-1"
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.senderId === "practitioner-1"
                                    ? "bg-blue-100"
                                    : "bg-gray-100"
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs font-medium">
                                    {message.senderId === "admin-1" ? "Admin" : "Dr. Smith"}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {format(message.createdAt, "MMM d, yyyy 'at' h:mm a")}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm">{message.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-gray-500">No messages found for this patient.</p>
                        </div>
                      )}
                    </div>
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Input className="flex-1" placeholder="Type your message..." />
                        <Button>Send</Button>
                      </div>
                    </div>
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
