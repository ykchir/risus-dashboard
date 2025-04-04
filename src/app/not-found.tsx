import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <h1 className="mb-2 text-8xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-3xl font-bold">Page introuvable</h2>
        <p className="mb-8 text-muted-foreground">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Button asChild variant="default">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </div>
  );
}
