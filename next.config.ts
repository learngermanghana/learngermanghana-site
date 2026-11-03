import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Marketing pages, class details and forms are published as static files.
  // Vercel serves them via its CDN without per-visit Fluid Compute.
  output: "export",
  images: {
    // Static export cannot use Next's runtime image optimizer.
    // This also avoids Vercel image-transformation requests.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "blog.falowen.app", pathname: "/**" },

      // GitHub raw (Falowen blog photos)
      { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/**" },

      // YouTube lesson thumbnails
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },

      // Imgur images
      { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "imgur.com", pathname: "/**" },

      // Common CDNs
      { protocol: "https", hostname: "i0.wp.com", pathname: "/**" },
      { protocol: "https", hostname: "i1.wp.com", pathname: "/**" },
      { protocol: "https", hostname: "i2.wp.com", pathname: "/**" },
      { protocol: "https", hostname: "secure.gravatar.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
