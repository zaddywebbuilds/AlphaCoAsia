import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
  async redirects() {
    return [
      {
        source: "/raymond-cheung",
        destination: "/team/raymond-cheung",
        permanent: true,
      },
      {
        source: "/raymond-cheung/",
        destination: "/team/raymond-cheung/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
