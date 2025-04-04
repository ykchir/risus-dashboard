/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optimisation de la compilation
  poweredByHeader: false,
  // Désactiver le mode standalone qui cause l'erreur
  // output: "standalone",
  experimental: {
    // Activer les options pour résoudre les problèmes de compilation
    serverMinification: false,
    turbotrace: {
      logLevel: "error",
      logAll: true,
    },
  },
  // Gérer les redirections proprement
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
