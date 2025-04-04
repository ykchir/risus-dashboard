"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FileText,
  Users,
  Calendar,
  AlertCircle,
  X,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";

// Types
interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResultItem {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
}

interface SearchResultGroup {
  category: string;
  items: SearchResultItem[];
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const searchResults: SearchResultGroup[] = [
    {
      category: "Patients récents",
      items: [
        { id: "1", name: "Anis Dhahbi", type: "patient", icon: <Users className="mr-2 h-4 w-4" /> },
        { id: "2", name: "Khalil Issa", type: "patient", icon: <Users className="mr-2 h-4 w-4" /> },
        {
          id: "3",
          name: "Robert Johnson",
          type: "patient",
          icon: <Users className="mr-2 h-4 w-4" />,
        },
      ],
    },
    {
      category: "Documents",
      items: [
        {
          id: "1",
          name: "Rapport mensuel",
          type: "document",
          icon: <FileText className="mr-2 h-4 w-4" />,
        },
        {
          id: "2",
          name: "Formulaire d'inscription",
          type: "document",
          icon: <FileText className="mr-2 h-4 w-4" />,
        },
      ],
    },
    {
      category: "Rendez-vous",
      items: [
        {
          id: "1",
          name: "Consultation - 15/04",
          type: "appointment",
          icon: <Calendar className="mr-2 h-4 w-4" />,
        },
        {
          id: "2",
          name: "Suivi - 22/04",
          type: "appointment",
          icon: <Calendar className="mr-2 h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-[550px]">
        <DialogHeader className="px-4 pb-0 pt-4">
          <DialogTitle className="text-lg font-semibold">Recherche</DialogTitle>
        </DialogHeader>
        <Command className="overflow-hidden rounded-lg border-0 shadow-none">
          <CommandInput placeholder="Rechercher un patient, un document..." />
          <CommandList className="max-h-[400px]">
            <CommandEmpty className="py-6 text-center text-sm">
              <AlertCircle className="mx-auto h-6 w-6 text-muted-foreground/60" />
              <p className="text-muted-foreground">Aucun résultat trouvé.</p>
            </CommandEmpty>
            {searchResults.map((group) => (
              <CommandGroup key={group.category} heading={group.category} className="p-2">
                {group.items.map((item) => (
                  <CommandItem key={item.id}>
                    <div className="flex items-center">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
        <div className="flex items-center justify-between border-t p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ChevronsUpDown className="h-4 w-4" />
            <span>Naviguer</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <X className="h-4 w-4" />
            <span>Fermer</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
