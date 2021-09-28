import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';
import Link from "next/link"

import getCustomProps from "utils/custom-page-props";import Button from "@/components/elements/button";
;
export const getStaticProps = getCustomProps(['register'])

const Landing = ({ metadata, global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='w-10/12 max-w-screen-md space-y-6 flex flex-col items-center'>
          <h1 className='text-6xl uppercase text-center'>Your proffessional influencer community</h1>
          <h2 className='text-2xl text-gray-400 text-center'>Join a professional community of brands and influencers who aspire to collaborate and do great work together.</h2>
          <div className='space-x-8'>
            <Button appearance='black'>Find influencers</Button>
            <Button>Find work</Button>
          </div>
        </div>
      </div>

      <div className='bg-black flex justify-around p-8 flex-wrap'>
        <Info num={1} title='Explore' text='Explore and connect with inspiring, creative, and professional influencers.' />
        <Info num={2} title='Create' text='Create lasting, impactful, and authentic collaborations together.' />
        <Info num={3} title='Influence' text='Share experiences, know-how, and expertise with your network and influence each other.' />
      </div>
    </Layout>
  )
}

const Info = ({ num, title, text }) => (
  <div className='text-white flex w-72 space-x-4 items-start hover:opacity-100 opacity-50 my-4'>
    <div className='border-2 border-white rounded-full p-4'>{'0' + num}</div>
    <div>
      <h5 className='text-xl font-bold'>{title}</h5>
      <p>{text}</p>
    </div>
  </div>
)

export default Landing
