/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const config = () => {
  /** @type {import('next').NextConfig} */
  const config = {
    redirects: async () => {
      return [
        {
          source: "/",
          destination: "/guide",
          permanent: true,
        },
      ];
    },
    env: {
      NEXT_PUBLIC_MIEX_API_URL: "https://apidev.miex.one/api/v1",
    },
    reactStrictMode: false,
    images: {
      unoptimized: true,
    },
  };

  return withNextIntl(config);
};

export default config;
