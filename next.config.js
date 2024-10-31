/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["gsap"]);

module.exports = withTM({
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/product-list",
        destination: "/product-list/air",
        permanent: true,
      },
    ];
  },
});
