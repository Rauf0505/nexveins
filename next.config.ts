import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { qualities: [75, 85] },
  // Nodemailer needs native Node networking; don't bundle it for the client/runtime.
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;
