import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';
import Link from "next/link"
import TestimonialGroup from 'components/sections/testimonials-group.js'
import FeatureRowsGroup from "@/components/sections/feature-rows-group";
import urls from 'utils/urls'
import ButtonLink from "@/components/elements/button-link";

import getCustomProps from "utils/custom-page-props";;
export const getStaticProps = getCustomProps(['register'])

const testimonialData = {
  title: 'What our clients say about us.',
  subTitle: 'Testimonials',
  testimonials: [
    {
      picture: {
        url: `${urls.landing}/images/MG image.png`,
      },
      authorName: 'Morten',
      authorTitle: 'Co-founder and CEO, Webshopskolen',
      text: 'Influencio has everything you need to drive influencer marketing campaigns. They’re the most competitive solution on the market in terms of pricing, and the one I recommend to all my clients who are building webshops from the ground up.'
    },
    {
      picture: {
        url: `${urls.landing}/images/image 1.png`,
      },
      authorName: 'Frederik',
      authorTitle: 'Founder and CEO, Market Memoir',
      text: 'As a new brand on the market, I found influencer marketing essential to get our name out there. Using Influencio has simplified everything in finding and managing influencers, and we’ve been able to boost our sales significantly. '
    }
  ]
}

const featureRowsData = {
  features: [
    {
      id: "1", 
      title: 'Discover your next influencers',
      description: 'Influencio provides rich insights into influencers including audience demographics, content style, brand affinity, relevant KPI’s, and our exclusive resumé function. ',
      customMedia: <div>test</div>
    },
    {
      id: "2", 
      title: 'Post and manage your campaigns',
      description: 'Generate awareness around your brand directly on the platform by offering influencers the opportunity to join your campaigns. ',
      customMedia: <div>test</div>
    }
  ]
}

const Businesses = ({ metadata, global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='flex justify-center items-center flex-wrap my-8 container'>
        <div className='max-w-screen-lg w-full md:w-8/12 space-y-4 flex flex-col items-start'>
          <p className='text-blue-600'>JUMP START YOUR GROWTH.</p>
          <h1 className='text-6xl font-bold'>Scale your business with influencer marketing</h1>
          <h3 className='text-xl'>Discover influencers for your brand, post and monitor campaigns, give reviews, generate awareness, and boost sales through authentic collaborations — all within a single platform.</h3>
          <ButtonLink appearance='black' link='/register/company'>GET FREE ACCESS NOW</ButtonLink>
        </div>

        <div className='max-w-screen-lg w-full md:w-4/12 space-x-2 flex'>
          <img src={`${urls.landing}/images/pexels-fauxels-3183188 1.png`} style={{height: 'max-content'}} className='w-4/12' />
          <img src={`${urls.landing}/images/pexels-fauxels-3183188 2.png`} style={{height: 'max-content'}} className='w-4/12 mt-10' />
          <img src={`${urls.landing}/images/pexels-fauxels-3183188 3.png`} style={{height: 'max-content'}} className='w-4/12' />
        </div>
      </div>

      <FeatureRowsGroup data={featureRowsData} />

      <TestimonialGroup data={testimonialData} />
    </Layout>
  )
}

export default Businesses
