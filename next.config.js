module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  target: "serverless",
  future: { webpack5: true },
  webpack: config => {
    config.resolve.fallback = { fs: false, module: false }

    return config
  },
}
