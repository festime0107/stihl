/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Nëse më vonë përdor foto nga domain-e të jashtme,
  // shtoji këtu për optimizim me next/image.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;
