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
  // Résoudre les problèmes d'erreurs 500 sur les routes dynamiques en production
  images: {
    domains: ["localhost"],
    unoptimized: true,
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
