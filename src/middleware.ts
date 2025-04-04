// Middleware temporairement supprimé pour résoudre les problèmes d'authentification

import { NextResponse } from "next/server";

// Fonction middleware minimale qui ne fait rien
// Une fois que l'authentification fonctionne, vous pourrez la remplacer par votre logique complète
export function middleware() {
  return NextResponse.next();
}
