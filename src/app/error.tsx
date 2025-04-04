"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Vous pouvez enregistrer l'erreur dans un service comme Sentry
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <h1 className="mb-2 text-4xl font-bold">Une erreur s&apos;est produite</h1>
        <p className="mb-8 text-muted-foreground">
          {error.message || "Une erreur inattendue s&apos;est produite."}
        </p>
        <Button onClick={reset}>Réessayer</Button>
      </div>
    </div>
  );
}
