module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  target: "serverless",
  webpack: config => {
    config.resolve.fallback = { fs: false, module: false, path: false }

    return config
  },
}
