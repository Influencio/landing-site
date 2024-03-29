import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';
import Link from "next/link"
import Button from "@/components/elements/button";
import urls from 'utils/urls';
import { AiOutlineEdit, AiOutlineFileImage, AiOutlineCloudUpload, AiOutlineShareAlt, AiOutlineUsergroupAdd, AiOutlineRight } from 'react-icons/ai'
import FeatureRowsGroup from "@/components/sections/feature-rows-group";

import getCustomProps from "utils/custom-page-props";import ButtonLink from "@/components/elements/button-link";
;
export const getStaticProps = getCustomProps(['influencers'])

const featureRowsData = {
  features: [
    {
      id: '1',
      title: 'You’re worth more than your likes',
      customMedia: <img src={`${urls.landing}/images/jonathan-borba-sfOOhuw-K8w-unsplash 1.png`} />,
      description: 'Your SoMe insights are important when measuring the success of campaigns, but they shouldn’t define you. We know, first-hand, that you put a lot of effort into the content you create and the brands you collaborate with. We believe brands should choose you based on your previous experience, expertise and personal brand.\nThat’s why we’ve built Influencio. To let you express your professionalism, and showcase your commercial profile rather than just the numbers.',
      checks: [
        'Give brands instant access to your content style by connecting posts with collabs on your profile',
        'Tell your story behind every collaboration you’ve made directly on your profile',
        'Share your commercial experiences, let brands understand who you are and inspire others'
      ]
    },
  ]
}

const Influencers = ({ metadata, global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='w-10/12 max-w-screen-lg space-y-6 flex flex-col items-center'>
          <h4 className='text-xl text-light-blue-500 font-bold'>A PLATFORM BUILT FOR YOU.</h4>
          <h1 className='text-6xl md:text-9xl uppercase text-center'>the future of the influencer industry</h1>
          <h2 className='text-2xl text-gray-400 text-center max-w-screen-md'>Content creator, SoMe Consultant, Influencer, Blogger, you name it - our community is for all the creators. Join the first professional community for influencers and help change the perception of the industry. </h2>
          <ButtonLink appearance='spring-wood' link='/register/influencer'>GET STARTED FOR FREE NOW</ButtonLink>
        </div>
      </div>

      <div className='grid grid-rows-2 md:grid-rows-1 grid-flow-col gap-8 container max-w-screen-xl'>
        <img className='w-full max-w-[500px] mx-auto' src={`${urls.landing}/images/Group 724 1.png`} />
        <div className='space-y-4 p-1 lg:px-8'>
          <h3 className='text-4xl font-bold'>Build your own exclusive profile</h3>
          <p>Create your exclusive profile and showcase the experience you’ve gained as an influencer. We know you spend a lot of time creating great content for brands and we want to acknowledge that. Let the world know what happens behind the scenes and contribute to professionalizing the industry.</p>

          <div className='space-y-8'>
            <ListItem icon={<AiOutlineEdit />} text='Create your profile now' />
            <ListItem icon={<AiOutlineFileImage />} text='Digitize your media kit' />
            <ListItem icon={<AiOutlineCloudUpload />} text='Connect content to your collabs' />
          </div>
        </div>
      </div>

      <div className='container grid grid-rows-3 sm:grid-rows-2 md:grid-rows-1 grid-flow-col gap-8 my-32 grid-cols-12'>
        <h3 className='text-3xl font-bold col-span-12 md:col-span-4'>Join a community of professional influencers</h3>
        <div className='flex items-start space-x-4 col-span-12 sm:col-span-6 md:col-span-4'>
          <div className='font-bold text-2xl p-3 rounded-full text-gray-600 bg-spring-wood-100'><AiOutlineUsergroupAdd /></div>
          <div>
            <h6 className='font-bold'>Grow your network</h6>
            <p>Connect with other influencers and start growing your network. </p>
          </div>
        </div>

        <div className='flex items-start space-x-4 col-span-12 sm:col-span-6 md:col-span-4'>
          <div className='font-bold text-2xl p-3 rounded-full text-gray-600 bg-spring-wood-100'><AiOutlineShareAlt /></div>
          <div>
            <h6 className='font-bold'>Share your experiences</h6>
            <p>Share your experiences as an influencer with other community members.</p>
          </div>
        </div>
      </div>

      <div className='container my-48 max-w-screen-lg'>
        <div className='bg-black text-white py-32 px-16 md:px-36 flex flex-col justify-center items-center relative'>
          <div className='uppercase font-bold absolute top-16 left-24'>the edge of influence</div>

          <div className='flex max-w-screen-sm flex-wrap justify-center space-y-8 md:space-y-0'>
            <div className='space-y-6 w-auto md:w-4/12'>
              <img src={`${urls.landing}/images/Screenshot 2021-10-04 at 13.38 1.png`} />
              <div>
                <div className='font-bold'>Camille Charriere</div>
                <div className='font-bold text-sm text-gray-500'>Influencer & Blogger</div>
              </div>
            </div>

            <div className='font-bold w-full md:w-8/12'>
              “Our help is vital in selling your products and spreading your messages, even if you’ve turned what we do into a derogatory term. ‘Oh, she’s an influencer’ always seems to be said in an accusatory fashion, as if we are being deceitful and doing something to people despite their consent.”
            </div>
          </div>

          <a target='_blank' rel="noopener noreferrer" className='cursor-pointer absolute right-0 bg-spring-wood-100 px-8 py-4 text-black flex space-x-4 items-center' style={{ bottom: -15 }} href='https://www.instagram.com/p/CQ530ewjcfu/'>Go to article <AiOutlineRight /></a>
        </div>
      </div>

      <FeatureRowsGroup data={featureRowsData} />

      <div className='container max-w-screen-lg grid grid-cols-12 grid-rows-2 md:grid-rows-1'>
        <div className='space-y-12 col-start-1 col-end-12 md:col-end-3 flex flex-col justify-center overflow-hidden items-center'>
          <img src={`${urls.landing}/images/pexels-cottonbro-2773521 1.png`} style={{height:'max-content'}} />
          <img src={`${urls.landing}/images/boxed-water-is-better-9eXP4VvhCl4-unsplash 1.png`} style={{height:'max-content'}} />
          <img src={`${urls.landing}/images/noah-naf-d3qemhQ7Mpg-unsplash 1.png`} style={{height:'max-content'}} />
        </div>

        <div className='col-start-1 md:col-start-4 col-end-12 space-y-8 my-48'>
          <h3 className='text-4xl font-bold'>Accelerate your career</h3>
          <div className='mt-4 grid grid-rows-4 md:grid-rows-2 grid-flow-col gap-8'>
            <div>
              <h6 className='text-lg font-bold'>Find opportunities</h6>
              <p>We’re working with several businesses and brands with impactful agendas waiting to partner up with you.</p>
            </div>
            
            <div>
              <h6 className='text-lg font-bold'>Activate your profile</h6>
              <p>Fill out your profile and let brands know you’re ready for your next impactful collaboration.</p>
            </div>

            <div>
              <h6 className='text-lg font-bold'>Get paid</h6>
              <p>Apply to campaigns you find interesting or let brands recruit you and work on your terms. Start getting paid today.</p>
            </div>

            <div>
              <h6 className='text-lg font-bold'>Grow your network</h6>
              <p>Share experiences and connect with other influencers. Find your next co-partner and represent brands together.</p>
            </div>
          </div>

          <div>
            <h6 className='text-lg font-bold'>Established with an agent? No problem.</h6>
            <p>We’re not here to compete with agencies. In fact, we’d like to help automate processes and streamline workflows for agencies. We know that brands find influencer media kits imperative before engaging in collaborations, and with Influencio you can simply have your agent(s) send them a link to your profile and everything about you is highlighted. </p>
          </div>
        </div>
      </div>

      <div className='container grid grid-rows-3 sm:grid-rows-2 md:grid-rows-1 grid-flow-col gap-8 my-32 grid-cols-12'>
        <h3 className='text-3xl font-bold col-span-12 md:col-span-4'>We’ll pay you to help us grow.</h3>
        <div className='flex items-start space-x-4 col-span-12 sm:col-span-6 md:col-span-4'>
          <div className='text-xl py-3 px-4 rounded-full text-gray-600 bg-spring-wood-100'>+1</div>
          <div>
            <h6 className='font-bold'>The bigger the better</h6>
            <p>A larger network is not only better for us, but it’s better for you. Onboard +1 of your fellow influencers and be invited to the following opportunity.</p>
          </div>
        </div>

        <div className='flex items-start space-x-4 col-span-12 sm:col-span-6 md:col-span-4'>
          <div className='text-xl py-3 px-5 rounded-full text-gray-600 bg-spring-wood-100'>$</div>
          <div>
            <h6 className='font-bold'>Onboard and get paid!</h6>
            <p>Earn <strong>€100</strong> for every brand you onboard to Influencio Pro. All you have to do is put us in touch with the brand and we’ll pay you if they end up subscribing.</p>
          </div>
        </div>
      </div>

      <div className='container text-center my-48 max-w-screen-lg'>
        <h3 className='text-4xl font-bold'>Eager to get started?</h3>
        <div className='text-xl'>Follow the steps below.</div>

        <div className='grid grid-rows-4 sm:grid-rows-2 lg:grid-rows-1 grid-flow-col gap-8 container my-8'>
          <ListImageItem num='01' title='Sign up' image={`${urls.landing}/images/Rectangle 64.png`} />
          <ListImageItem num='02' title='find opportunities' image={`${urls.landing}/images/Rectangle 64-1.png`} />
          <ListImageItem num='03' title='get paid' image={`${urls.landing}/images/Rectangle 64-2.png`} />
          <ListImageItem num='04' title='grow your career' image={`${urls.landing}/images/Rectangle 64-3.png`} />
        </div>
      </div>

      <div>
        <div className='bg-spring-wood-100'>
          <div className='container px-8 md:px-16 py-32 space-y-12'>
            <h2 className='text-4xl md:text-7xl font-bold'>Join your professional influencer community now.</h2>
            <div className='flex'>
              <ButtonLink link='register/influencer' appearance='black'>Let me in!</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const ListItem = ({ icon, text }) => (
  <div className='flex space-x-4'>
    <div className='bg-spring-wood-100 rounded-full p-2 text-gray-700'>{icon}</div>
    <p className='font-bold'>{text}</p>
  </div>
)

const ListImageItem = ({ num, title, image }) => (
  <div className='space-y-4 flex flex-col items-center'>
    <div className='relative'>
      <img src={image} className='h-72' />
      <div className='p-2 bg-white text-black absolute left-0 bottom-0'>{num}</div>
    </div>

    <h5 className='text-2xl' style={{
      fontFamily: 'Bebas Neue'
    }}>{title}</h5>
  </div>
)

export default Influencers
