import { getCustomPageData, getGlobalData } from "utils/api"
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';
import Link from "next/link"

const Index = ({ metadata, global, pageContext }) => {
  
  const shortTexts = textMap(pageContext.texts.shortTexts)
  const images = imageMap(pageContext.images)

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <h1 className='title my-32 text-center'>INFLUENCIO</h1>

      <div className='flex w-full h-full lg:flex-row flex-col'>
        <Link href='/register/influencer'> 
          <div className='w-full lg:w-6/12 text-center h-full flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer'>
            <img className='px-32 max-w-5xl w-full' alt='Company illustration' src={images.selectInfluencerImage.url} />
            <div className='text-4xl my-12 text-gray-700'>{shortTexts.selectInfluencer}</div>
          </div>
        </Link>

        <Link href='/register/company'> 
          <div className='w-full lg:w-6/12 text-center h-full flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer'>
            <img className='px-32 max-w-5xl w-full' alt='Company illustration' src={images.selectCompanyImage.url} />
            <div className='text-4xl my-12 text-gray-700'>{shortTexts.selectCompany}</div>
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


export default Index
