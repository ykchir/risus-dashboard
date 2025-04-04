"use client";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-3xl font-bold">Admin Dashboard</h1>
      <p className="mb-8 text-gray-500">Redirecting to admin dashboard...</p>
      <div className="flex justify-center">
        <a
          href="/dashboard"
          className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
