import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "AlphaCoAsia";

const basePath = isProd ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: isProd ? `/${repoName}/` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Raw <video>/<source> src attributes don't get basePath applied the way
  // next/image and next/link do, so expose it for components that need it.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
