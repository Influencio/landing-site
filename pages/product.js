import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';
import Link from "next/link"
import urls from 'utils/urls'
import FeatureRowsGroup from "@/components/sections/feature-rows-group";

import getCustomProps from "utils/custom-page-props";;
export const getStaticProps = getCustomProps(['product'])

const featureRowsData = {
  features: [
    {
      id: '1',
      title: 'Build a squad of your favorite influencers',
      customMedia: <img src={`${urls.landing}/images/pexels-liza-summer-6347919 1.png`} />,
      checks: [
        'Assemble a list of your favorite and trusted influencers for future campaigns',
        'Invite influencers you’ve previously collaborated with to Influencio',
        'Create a community for you and your favorite influencers and share SoMe insights'
      ]
    },
    {
      id: '2',
      title: 'Create your own content cloud',
      description: 'Influencio organizes all of the content created by your influencers in a cloud-available storage system, which you can use to approve content before being posted, share with your team, and download for your own use. ',
      customMedia: <img src={`${urls.landing}/images/Screenshot 2021-09-27 at 10.52 1.png`} />,
      checks: [
        'Review content and captions made by your influencers to align goals and ensure quality',
        'Download influencer generated content for reposts on your own SoMe channels'
      ]
    },
    {
      id: '3',
      title: 'Measure performance with data-driven reporting',
      description: 'Influencio keeps track of all the metrics needed to measure the performance of your influencer marketing campaigns.',
      customMedia: <img src={`${urls.landing}/images/Screenshot 2021-09-27 at 10.54 1.png`} />,
      checks: [
        'Keep track of each influencer and measure the performance of all campaign-related content',
        'Measure all important insights including reach, impressions, engagement rates, likes and comments',
        'Influencio will identify your top-performing influencers, allowing you to re-hire them'
      ]
    },
  ]
}

const Product = ({ metadata, global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='flex flex-col-reverse'> {/* col reverse is needed here for layering purposes (it's ugly but it works and I don't understand why - feel free to fix) */}
        <div className='-mt-8 md:-mt-16 z-10 w-full bg-black text-white text-center py-12 flex justify-center'>
          <div className='max-w-screen-sm flex flex-col justify-center space-y-4'>
            <h5 className='uppercase text-lg'>navigate with clarity.</h5>
            <h4 className='uppercase text-3xl'>All-in-one solution to manage all your influencer marketing activities</h4>
          </div>
        </div>

        <div className='text-center mt-24 flex flex-col justify-center items-center container'>
          <h1 className='uppercase text-6xl font-bold'>all you need in one place</h1>
          <h3 className='text-gray-500 text-xl'>Discover, run campaigns, recruit, and pay — everything in one place.</h3>

          <img className='w-full md:w-10/12 mt-10' alt='the influencio platform' src={`${urls.landing}/images/Screenshot 2021-09-27 at 10.49 1.png`} />
        </div>
      </div>

      <div className='container my-24'>
        <h3 className='text-3xl w-full md:w-6/12'>Create impactful and lasting collaborations with influencers</h3>

        <div className='mt-4 grid grid-rows-4 md:grid-rows-2 lg:grid-rows-1 grid-flow-col gap-4'>
          <InfoBox title='Create a free campaign' text='Take 5 minutes to create and post a campaign and start recruting influencers for impactful and lasting collaborations now.' num='01' />
          <InfoBox title='Invite influencers' text='Notify selected influencers of your campaign and invite anyone you would like to participate and collaborate with your brand.' num='02' />
          <InfoBox title='Compare influencers' text='Compare influencers on multiple levels to see which profiles create the best match for your brand and campaign goals.' num='03' />
          <InfoBox title='On your terms' text='You decide the terms and conditions of your campaigns, and can expect all our influencers to be professional and follow your guidelines.' num='04' />
        </div>
      </div>

      <FeatureRowsGroup data={featureRowsData} />

    </Layout>
  )
}

const InfoBox = ({ title, text, num }) => (
  <div>
    <h5 className='text-lg font-bold mb-2'>{title}</h5>
    <div className='relative p-4 bg-gray-100'>
      <p className='text-gray-700'>{text}</p>
      <div className='absolute right-0 bottom-0 bg-white font-bold p-2'>{num}</div>
    </div>
  </div>
)

export default Product
