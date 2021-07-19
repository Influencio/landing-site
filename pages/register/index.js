import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';
import Link from "next/link"

import getCustomProps from "utils/custom-page-props";;
export const getStaticProps = getCustomProps(['register'])

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

export default Index
