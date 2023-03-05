import path from 'path';
import { fileURLToPath, URL } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracing: true,
  experimental: {
    outputFileTracingRoot: path.resolve(__dirname, `../../`),
  },
  reactStrictMode: true,
  transpilePackages: ['models'],
};

export default nextConfig;
