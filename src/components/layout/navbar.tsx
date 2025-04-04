"use client";

import { CommandSearch } from "@/components/search/command-search";
import { NotificationButton } from "@/components/notification/notification-button";
import { UserDropdown } from "@/components/user/user-dropdown";
import { MobileMenuToggle } from "@/components/mobile/mobile-menu-toggle";

interface NavbarProps {
  onMenuButtonClick: () => void;
}

/**
 * Composant Navbar principal qui intègre les différentes parties modulaires
 * Chaque partie est décomposée en son propre composant réutilisable
 */
export default function Navbar({ onMenuButtonClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-background px-4 shadow-md md:px-6">
      {/* Affichage du bouton de menu mobile uniquement sur les petits écrans */}
      <div className="flex items-center md:hidden">
        <MobileMenuToggle onClick={onMenuButtonClick} />
      </div>

      {/* Espacement pour aligner les éléments à droite */}
      <div className="flex-1"></div>

      {/* Actions utilisateur en ligne */}
      <div className="flex items-center gap-4">
        <CommandSearch />
        <NotificationButton />
        <UserDropdown />
      </div>
    </header>
  );
}
