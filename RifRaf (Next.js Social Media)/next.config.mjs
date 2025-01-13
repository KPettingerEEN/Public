/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_AWS_ACCESS_KEY: process.env.REACT_APP_AWS_ACCESS_KEY,
    REACT_APP_AWS_SECRET_KEY: process.env.REACT_APP_AWS_SECRET_KEY,
    REACT_APP_AWS_REGION: process.env.REACT_APP_AWS_REGION,
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;
  