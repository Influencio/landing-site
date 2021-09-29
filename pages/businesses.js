import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';
import Link from "next/link"
import TestimonialGroup from 'components/sections/testimonials-group.js'
import urls from 'utils/urls'

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

const Businesses = ({ metadata, global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='flex justify-center items-center'>
        <div className='max-w-screen-lg w-full'>
          <p className='text-blue-600'>JUMP START YOUR GROWTH.</p>
          <h1 className='text-6xl font-bold'>Scale your business with influencer marketing</h1>
          <h3 className='text-xl'>Discover influencers for your brand, post and monitor campaigns, give reviews, generate awareness, and boost sales through authentic collaborations — all within a single platform.</h3>
        </div>
      </div>

      <TestimonialGroup data={testimonialData} />
    </Layout>
  )
}

export default Businesses