"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Vous pouvez enregistrer l'erreur dans un service comme Sentry
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
          <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
            <h1 className="mb-2 text-4xl font-bold">Erreur fatale</h1>
            <p className="mb-2 text-red-500">
              Une erreur critique s&apos;est produite dans l&apos;application.
            </p>
            <p className="mb-8 text-muted-foreground">
              {error.message || "Erreur système inattendue."}
            </p>
            <Button onClick={reset}>Réessayer</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
