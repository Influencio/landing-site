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

export const getStaticProps = getCustomProps(['/'])

const Landing = ({ metadata, global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='flex flex-col items-center justify-center mt-48 mb-72'>
        <div className='w-10/12 max-w-screen-lg space-y-6 flex flex-col items-center'>
          <h1 className='text-6xl md:text-9xl uppercase text-center'>Your proffessional influencer community</h1>
          <h2 className='text-2xl text-gray-400 text-center max-w-screen-sm'>Join a professional community of brands and influencers who aspire to collaborate and do great work together.</h2>
          <div className='space-x-8'>
            <Button appearance='black'>Find influencers</Button>
            <Button>Find work</Button>
          </div>
        </div>
      </div>

      <div className='bg-black'>
        <div className='container flex justify-around py-8 flex-wrap'>
          <Info num={1} title='Explore' text='Explore and connect with inspiring, creative, and professional influencers.' />
          <Info num={2} title='Create' text='Create lasting, impactful, and authentic collaborations together.' />
          <Info num={3} title='Influence' text='Share experiences, know-how, and expertise with your network and influence each other.' />
        </div>
      </div>

      <div className='flex w-full my-16 justify-center container'>
        <div className='grid grid-rows-2 md:grid-rows-1 grid-flow-col gap-4 grid-cols-12'>
          <div className='p-8 col-span-12 md:col-span-6 lg:col-span-4'>
            <h3 className='text-4xl my-3 font-bold mb-12'>Influencer marketing is a two-way street</h3>
            <strong>All-in-one and more to come</strong>
            <p>Influencio is for both influencers and businesses. Our mission is not only to simplify influencer marketing for brands, but to build a place for influencers to express all the work that happens behind the scenes.</p>
          </div>

          <ImageChange />
        </div>
      </div>

      <div className='flex justify-center items-center my-24 mx-8 sm:mx-24'>
        <ButtonLink link='/register' appearance='spring-wood' xl={true}>GET STARTED NOW</ButtonLink>
      </div>

      <div className='flex justify-center'>
        <HowDoesItWork />
      </div>

      <div className='flex justify-center'>
        <div className='flex max-w-screen-xl'>
          <img style={{ maxWidth: 'unset'}} className='w-6/12' src={`${urls.landing}/images/alizee-baudez-a4Nid9fLLlo-unsplash 1.png`} />
          <div className='bg-black text-white w-6/12 flex flex-col p-8 justify-center items-center'>
            <div className='justify-center items-center flex flex-col max-w-lg text-center space-y-4'>
              <h3 className='text-3xl font-bold'>Are you a business?</h3>
              <p className='text-lg'>Schedule a meeting with one of our experts and take a guided tour through the platform.</p>
              <ButtonLink link='mailto:admin@influencio.dk' appearance='spring-wood'>BOOK A MEETING NOW</ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full my-16 justify-center'>
        <div className='flex w-full max-w-screen-xl flex-col md:flex-row md:space-x-32 items-center'>
          <div className='p-8'>
            <h3 className='text-4xl my-3 font-bold'>Find influencers with experience in your market</h3>
            {/* TODO: Add tags */}
          </div>

          <img style={{ maxWidth: 400 }} className='w-full' src={`${urls.landing}/images/Screenshot 2021-09-27 at 10.45 1.png`} />
        </div>
      </div>

      <div>
        <div className='bg-spring-wood-100'>
          <div className='container px-8 md:px-16 py-32 space-y-12'>
            <h2 className='text-4xl md:text-7xl font-bold'>Join your professional influencer community now.</h2>
            <div className='space-x-8 flex'>
              <ButtonLink link='/register/company' appearance='black'>For businesses</ButtonLink>
              <ButtonLink link='register/influencer' appearance='black'>For influencers</ButtonLink>
            </div>
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
      <div className="flex absolute bottom-0 left-0">
        <div
          onClick={() => setInfluencer(!influencer)}
          className="p-4 bg-white text-black cursor-pointer"
        >
          {"<"}
        </div>
        <div
          onClick={() => setInfluencer(!influencer)}
          className="p-4 bg-black text-white cursor-pointer"
        >
          {">"}
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] w-full col-span-12 md:col-span-6 lg:col-span-8">
      <h4 className="text-xl font-bold text-white m-4 uppercase absolute">
        {influencer ? "For Influencers" : "for businesses"}
      </h4>
      <Link href={`/register/${influencer ? "influencer" : "company"}`}>
        <div
          className="w-full h-full cursor-pointer bg-cover bg-center"
          style={{
            backgroundImage: `url("${urls.landing}/images/${
              influencer ? "pexels-plann-4549414 1.png" : "Businesses image.png"
            }")`,
          }}
        ></div>
      </Link>
      <ChangeBtn />
    </div>
  );
};

const HowDoesItWork = () => {
  const [influencer, setInfluencer] = useState(true);

  const Element = ({ title, text, icon }) => (
    <div className='col-span-12 md:col-span-6 lg:col-span-3'>
      <div className='bg-spring-wood-100 text-black text-4xl flex justify-center items-center h-16 w-16 rounded-full my-4'>{icon}</div>
      <h5 className='text-xl font-bold uppercase'>{title}</h5>
      <div className='text-gray-300'>{text}</div>
    </div>
  )

  return (
    <div className='text-white bg-black p-16 max-w-screen-xl my-16 relative'>
      <h3 className='text-3xl font-bold my-2'>How does it work?</h3>

      <div className='grid grid-rows-4 md:grid-rows-2 lg:grid-rows-1 grid-flow-col gap-4 grid-cols-12'>
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

      <div onClick={() => setInfluencer(!influencer)} className='cursor-pointer absolute right-0 bg-spring-wood-100 px-8 py-4 text-black flex space-x-4 items-center' style={{ bottom: -15 }}><span>{influencer ? 'businesses' : 'influencers'}</span> <AiOutlineRight /></div>
    </div>
  )
}

export default Landing
