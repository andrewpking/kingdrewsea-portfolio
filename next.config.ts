import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Old links to projects now redirect to the projects page.
  async redirects() {
    return [
      {
        source: "/kbcs",
        destination: "/projects/kbcs",
        permanent: true,
      },
      {
        source: "/high-speed-rail",
        destination: "/projects/high-speed-rail",
        permanent: true,
      },
      {
        source: "/mindmii",
        destination: "/projects/mindmii",
        permanent: true,
      },
      {
        source: "/resitogether",
        destination: "/projects/resitogether",
        permanent: true,
      },
      {
        source: "/sl-screens",
        destination: "/projects/sl-screens",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
