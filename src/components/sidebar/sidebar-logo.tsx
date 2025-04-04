"use client";

import Link from "next/link";
import Image from "next/image";

interface SidebarLogoProps {
  onNavigate: () => void;
}

export function SidebarLogo({ onNavigate }: SidebarLogoProps) {
  return (
    <div className="flex h-16 items-center justify-center bg-white px-6 shadow-md">
      <Link href="/dashboard" className="flex items-center" onClick={onNavigate}>
        <Image src="/risus.webp" alt="RISUS" width={300} height={200} className="h-14 w-auto" />
      </Link>
    </div>
  );
}
