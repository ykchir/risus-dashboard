"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/search/search-dialog";

export function CommandSearch() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Rechercher...</span>
        <span className="sr-only">Rechercher</span>
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
