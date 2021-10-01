import { useState } from "react";
import classnames from 'classnames'
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';
import Link from "next/link"
import urls from 'utils/urls'
import FeatureRowsGroup from "@/components/sections/feature-rows-group";
import { Tab } from '@headlessui/react'

import getCustomProps from "utils/custom-page-props";
import ButtonLink from "@/components/elements/button-link";

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

      <BrahTabs />

      <div className='container my-24 max-w-screen-lg'>
        <h3 className='text-3xl w-full md:w-6/12'>Create impactful and lasting collaborations with influencers</h3>

        <div className='mt-4 grid grid-rows-4 md:grid-rows-2 lg:grid-rows-1 grid-flow-col gap-4'>
          <InfoBox title='Create a free campaign' text='Take 5 minutes to create and post a campaign and start recruting influencers for impactful and lasting collaborations now.' num='01' />
          <InfoBox title='Invite influencers' text='Notify selected influencers of your campaign and invite anyone you would like to participate and collaborate with your brand.' num='02' />
          <InfoBox title='Compare influencers' text='Compare influencers on multiple levels to see which profiles create the best match for your brand and campaign goals.' num='03' />
          <InfoBox title='On your terms' text='You decide the terms and conditions of your campaigns, and can expect all our influencers to be professional and follow your guidelines.' num='04' />
        </div>
      </div>

      <FeatureRowsGroup data={featureRowsData} />

      <div className='flex flex-col text-center items-center py-36'>
        <div className='max-w-screen-sm flex flex-col items-center'>

          <div className='space-y-4 mb-12'>
            <h2 className='text-7xl font-bold'>Get started</h2>
            <h4 className='text-3xl'>Create your influencer campaign today, with Influencio.</h4>
          </div>

          <ButtonLink link='/register'>TRY NOW - IT'S FREE</ButtonLink>
        </div>
      </div>

    </Layout>
  )
}

const BrahTabs = () => {

  let [categories] = useState({
    Experience: {
      title: 'Evaluate your influencers based on experience',
      text: 'Data reveals how influencers perform, experience demonstrates who they are. Evaluate influencers through their online media kits showing previous collaborations, and understand whether their commercial profile is a good fit for your brand. ',
      image: `${urls.landing}/images/Group 743.png`
    },
    Insights: {
      title: 'Make decisions based on powerful insights',
      text: 'Invest in influencers who are strongly engaged with their audience and continuously captivate new followers. We provide all the analytics needed to aid your decision-making process, before investing time, effort, and money.',
      image: `${urls.landing}/images/campaign-creators-pypeCEaJeZY-unsplash 1.png`
    },
    Content: {
      title: 'Evaluate influencers on their content style',
      text: 'Remember the media kits we touched base on before? Well, they also include all the content an influencer has made in collaboration with a business. This gives you insight into how an influencer creates sponsored content, and saves you time on manual searches.',
      image: `${urls.landing}/images/gabrielle-henderson-bmUa09zy2ZQ-unsplash (1) 1.png`
    },
    Reviews: {
      title: 'Make decisions based on reviews and ratings',
      text: 'Read the reviews and ratings made by other businesses to gain a better understanding of the influencers you wish to work with.',
      image: `${urls.landing}/images/charles-deluvio-Lks7vei-eAg-unsplash 1.png`
    },
  })

  return (
    <div className="container w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-4 rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classnames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-gray-700 border-b-2 text-left',
                  selected
                    ? 'border-black'
                    : 'hover:bg-white/[0.12] hover:text-gray-500 border-gray-300'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((el, idx) => (
            <Tab.Panel
              key={idx}
            >
              <div className='mt-6 grid grid-rows-2 md:grid-rows-1 grid-flow-col gap-12'>
                <img src={el.image} />
                <div className='p-8 max-w-6/12'>
                  <h3 className='font-bold text-3xl'>{el.title}</h3>
                  <p className='text-gray-600 text-lg mt-4'>{el.text}</p>
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

const InfoBox = ({ title, text, num }) => (
  <div>
    <h5 className='text-lg font-bold mb-2'>{title}</h5>
    <div className='relative p-4 bg-gray-100 h-48'>
      <p className='text-gray-700'>{text}</p>
      <div className='absolute right-0 bottom-0 bg-white font-bold p-2'>{num}</div>
    </div>
  </div>
)

export default Product
