import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // experimental: {
  //   ppr: "incremental",
  // },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
