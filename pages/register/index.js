import { getCustomPageData, getGlobalData } from "utils/api"
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import textMap from 'utils/text-map';
import Link from "next/link"

const Index = ({ metadata, global, pageContext }) => {
  
  const shortTexts = textMap(pageContext.texts.shortTexts)
  console.log("🚀 ~ file: index.js ~ line 12 ~ Index ~ shortTexts", shortTexts)

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <h1 className='title my-32 text-center'>INFLUENCIO</h1>

      <div className='flex w-full h-full'>
        <Link href='/register/company'> 
          <div className='w-6/12 bg-red-400 text-center h-full flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer'>
            {/* <img alt='Company illustration' src='/Assets/graphics/undraw_Building_vpxo.svg' /> */}
            <div className='m-16 bg-gray-600 h-72 w-72' />
            <div className='text-3xl my-12 text-gray-700'>{shortTexts.selectCompany}</div>
          </div>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const { locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale)

  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getCustomPageData(
    { slug: ['register'] },
    locale,
    preview
  )

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { metadata, localizations, backgroundColor=null, shortTexts, longTexts } = pageData

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
      },
    },
  }
}


export default Index
