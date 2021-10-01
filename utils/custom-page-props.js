import { getCustomPageData, getGlobalData } from "./api"

export default slug => async context => {
  const { locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale || 'en')

  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getCustomPageData(
    { slug },
    locale,
    preview
  )

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { metadata, localizations, backgroundColor=null, shortTexts, longTexts, images } = pageData

  return {
    props: {
      preview,
      metadata,
      global: globalLocale,
      pageContext: {
        slug: pageData.slug,
        locale: pageData.locale,
        locales,
        defaultLocale,
        localizations,
        backgroundColor,
        texts: {
          shortTexts,
          longTexts
        },
        images
      },
    },
  }
}