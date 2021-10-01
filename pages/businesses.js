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
      subTitle: 'more than a directory.',
      description: 'Influencio provides rich insights into influencers including audience demographics, content style, brand affinity, relevant KPI’s, and our exclusive resumé function. ',
      customMedia: <img src={`${urls.landing}/images/Group 671.svg`} />,
      checks: [
        'Filter your search by 10+ audience and influencer criteria',
        'Search through a network of active users and not a directory',
        'Get instant access to influencers’ media kit',
        'Compare your influencer’s target audience with your brand’s'
      ]
    },
    {
      id: "2", 
      title: 'Post and manage your campaigns',
      subTitle: 'streamlined workflows.',
      description: 'Generate awareness around your brand directly on the platform by offering influencers the opportunity to join your campaigns. ',
      customMedia: <img src={`${urls.landing}/images/Group 672.svg`} />,
      checks: [
        'End your manual search for influencers and let them come to you',
        'Create your own community of influencers',
        'Manage all communications in one place',
        'Full control over your campaign guidelines'
      ]
    },
    {
      id: "3", 
      title: 'Track performance with data-driven reporting',
      subTitle: 'powerful performance insights.',
      description: 'Track, monitor, and optimize your influencer marketing investments through actionable performance reporting.',
      customMedia: <img src={`${urls.landing}/images/Group 673.svg`} />,
      checks: [
        'Automized tracking of content made by your influencers',
        'Track and measure performance of influencer content',
        'Use our storage system “Cloud Content” for content approval',
        'Download all content made by influencers'
      ]
    },
    {
      id: "4", 
      title: 'Verify quality through reviews',
      subTitle: 'generating transparency.',
      description: 'Influencio strives to generate transparency in the influencer marketing industry, and one way is by creating a review-oriented community.',
      customMedia: <img src={`${urls.landing}/images/Group 674.svg`} />,
      checks: [
        'Read reviews and ratings made by other companies',
        'Give your influencers reviews on their profiles',
        'Help influencers grow and evolve',
        'Contribute to generating transparency'
      ]
    }
  ]
}

const Businesses = ({ metadata, global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='flex justify-between items-center flex-wrap my-8 container'>
        <div className='max-w-screen-md w-full md:w-7/12 space-y-4 flex flex-col items-start'>
          <p className='text-blue-500 font-bold'>JUMP START YOUR GROWTH.</p>
          <h1 className='text-5xl md:text-7xl'>Scale your business with influencer marketing</h1>
          <h3 className='text-xl'>Discover influencers for your brand, post and monitor campaigns, give reviews, generate awareness, and boost sales through authentic collaborations — all within a single platform.</h3>
          <ButtonLink appearance='black' link='/register/company'>GET FREE ACCESS NOW</ButtonLink>
        </div>

        <div className='max-w-screen-lg w-full md:w-4/12 space-x-2 flex mt-6'>
          <img src={`${urls.landing}/images/pexels-fauxels-3183188 1.png`} style={{height: 'max-content'}} className='w-4/12' />
          <img src={`${urls.landing}/images/pexels-fauxels-3183188 2.png`} style={{height: 'max-content'}} className='w-4/12 mt-10' />
          <img src={`${urls.landing}/images/pexels-fauxels-3183188 3.png`} style={{height: 'max-content'}} className='w-4/12' />
        </div>
      </div>

      <FeatureRowsGroup data={featureRowsData} />

      <div className='flex justify-center w-full my-24'>
        <ButtonLink link='/register/company' appearance='black'>GET STARTED TODAY</ButtonLink>
      </div>

      <TestimonialGroup data={testimonialData} />
    </Layout>
  )
}

export default Businesses
