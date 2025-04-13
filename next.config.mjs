/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['placehold.co', 'github.com', 'avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
  // Excludes tracing (build trace) to improve static export
  experimental: {
    webVitalsAttribution: ['FCP', 'LCP', 'CLS', 'FID', 'INP', 'TTFB'],
  },
};

export default nextConfig;
