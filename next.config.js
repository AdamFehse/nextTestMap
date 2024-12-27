const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/nextTestMap/' : '', // Set the correct asset prefix for GitHub Pages
  basePath: isProd ? '/nextTestMap' : '', // Ensure your app is correctly served from the subpath
  output: 'export', // This is required for static export to GitHub Pages
};

export default nextConfig;
