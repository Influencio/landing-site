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

      {/* INFLUENCER */}
      <div className='w-full h-full flex flex-col md:flex-row md:space-x-16 justify-around container'>
        <Link href='/register/influencer'> 
          <div className='col-span-12 md:col-span-4 text-center h-full flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer'>
            <img className='h-auto md:h-[350px] max-w-5xl w-full' alt='Company illustration' src={images.selectInfluencerImage.url} />
            <div className='text-4xl my-12 text-gray-700'>{shortTexts.selectInfluencer}</div>
          </div>
        </Link>

        {/* COMPANY */}
        <Link href='/register/company'> 
          <div className='col-span-12 md:col-span-4 text-center h-full flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer'>
            <img className='h-auto md:h-[350px] max-w-5xl w-full' alt='Company illustration' src={images.selectCompanyImage.url} />
            <div className='text-4xl my-12 text-gray-700'>{shortTexts.selectCompany}</div>
          </div>
        </Link>

        {/* AGENCY */}
        <Link href='/register/agency'> 
          <div className='col-span-12 md:col-span-4 text-center h-full flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer'>
            <img className='h-auto md:h-[350px] max-w-5xl w-full' alt='Agency illustration' src={images.selectAgencyImage.url} />
            <div className='text-4xl my-12 text-gray-700'>{shortTexts.selectAgency}</div>
          </div>
        </Link>
      </div>
    </Layout>
  )
}

export default Index
