import { useState } from "react";
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';
import Link from "next/link"
import urls from 'utils/urls'
import { AiOutlineRight, AiOutlineUnorderedList, AiOutlineDollar, AiOutlineSearch, AiOutlineUserAdd, AiOutlineBarChart } from 'react-icons/ai'
import { VscMegaphone } from 'react-icons/vsc';

import getCustomProps from "utils/custom-page-props";
import Button from "@/components/elements/button";
import ButtonLink from "@/components/elements/button-link";

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

      <div className='flex w-full my-16 justify-center'>
        <div className='flex w-full max-w-screen-xl flex-col md:flex-row'>
          <div className='p-8'>
            <h3 className='text-3xl my-3'>Influencer marketing is a two-way street</h3>
            <strong>All-in-one and more to come</strong>
            <p>Influencio is for both influencers and businesses. Our mission is not only to simplify influencer marketing for brands, but to build a place for influencers to express all the work that happens behind the scenes.</p>
          </div>

          <ImageChange />
        </div>
      </div>

      <div className='flex justify-center items-center my-24 mx-8 sm:mx-24'>
        <Button>GET STARTED NOW</Button>
      </div>

      <div className='flex justify-center'>
        <HowDoesItWork />
      </div>

      <div>
        <div className='px-8 md:px-16 py-32 bg-gray-300 space-y-12'>
          <h2 className='text-4xl md:text-7xl font-bold'>Join your professional influencer community now.</h2>
          <div className='space-x-8 flex'>
            <ButtonLink link='/register/company' appearance='black'>For businesses</ButtonLink>
            <ButtonLink link='register/influencer' appearance='black'>For influencers</ButtonLink>
          </div>
        </div>
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

const ImageChange = () => {
  const [influencer, setInfluencer] = useState(true);

  const ChangeBtn = () => {

    return (
      <div className='flex absolute bottom-0 left-0'>
        <div onClick={() => setInfluencer(!influencer)} className='p-4 bg-white text-black cursor-pointer'>{"<"}</div>
        <div onClick={() => setInfluencer(!influencer)} className='p-4 bg-black text-white cursor-pointer'>{">"}</div>
      </div>
    )
  }

  return (
    <div className='relative w-full h-96 min-w-64' style={{ backgroundImage: `url("${urls.landing}/images/${influencer ? "pexels-plann-4549414 1.png" : "Businesses image.png"}")` }}>
      <h4 className='text-xl font-bold text-white m-4 uppercase'>{influencer ? "For Influencers" : "for businesses"}</h4>
      <ChangeBtn />
    </div>
  )
}

const HowDoesItWork = () => {
  const [influencer, setInfluencer] = useState(true);

  const Element = ({ title, text, icon }) => (
    <div className='w-3/12'>
      <div className='bg-white text-black text-4xl flex justify-center items-center h-16 w-16 rounded-full my-4'>{icon}</div>
      <h5 className='text-xl font-bold uppercase'>{title}</h5>
      <div className='text-gray-300'>{text}</div>
    </div>
  )

  return (
    <div className='text-white bg-black p-16 max-w-screen-xl my-16 relative'>
      <h3 className='text-3xl font-bold my-2'>How does it work?</h3>

      <div className='flex space-x-4'>
        {
          influencer ? (
            <>
              <Element icon={<AiOutlineUnorderedList />} title='sign up' text='Put your best foot forward by filling out your influencio profile with past collab experience, connect your Instagram, and personal info.' />
              <Element icon={<AiOutlineSearch />} title='find opportunities' text='Search through the platform and find campaigns that match your interests. Businesses may also be on the lookout for you, so stay active!' />
              <Element icon={<AiOutlineDollar />} title='make a living' text='You decide the boundaries for how much you earn. Work on fixed payments, organic advocacy, and/or commission based agreements.' />
              <Element icon={<AiOutlineUserAdd />} title='grow your network' text='Share your experiences with other community members, inspire others and be inspired. Elevate your career and grow your profile.' />
            </>
          ) : (
            <>
              <Element icon={<AiOutlineUnorderedList />} title='sign up' text='Create your account, add your logo and a brief description of your business.' />
              <Element icon={<AiOutlineSearch />} title='find influencers' text='Discover influencers for your brand using 10+ demographic and audience filters. Manage communications directly on the platform.' />
              <Element icon={<VscMegaphone />} title='post campaigns' text='Post campaigns and let influencers come to you. You decide the guidelines of your campaigns and the associated reward systems.' />
              <Element icon={<AiOutlineBarChart />} title='Track performance' text='Track, monitor, and optimize your influencer marketing investments through actionable performance reporting.' />
            </>
          )
        }
      </div>

      <div onClick={() => setInfluencer(!influencer)} className='cursor-pointer absolute right-0 border border-black bg-white px-8 py-4 text-black flex space-x-4 items-center' style={{ bottom: -15 }}><span>{influencer ? 'businesses' : 'influencers'}</span> <AiOutlineRight /></div>
    </div>
  )
}

export default Landing
