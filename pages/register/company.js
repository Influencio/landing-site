import React, { useEffect, useState } from 'react'
import Steps from 'components/atomic/step';
import {BiSelectMultiple, BiDollarCircle} from 'react-icons/bi'
import {AiOutlineUser, AiOutlineSmile} from 'react-icons/ai'
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import { getCustomPageData, getPageData, getGlobalData } from "utils/api"
import PricingContent from '@/components/elements/pricing-content';
import { useRouter } from 'next/router'

export const getStaticProps = async context => {
  const { locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale)

  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getCustomPageData(
    { slug: ['register', 'company'] },
    locale,
    preview
  )

  const priceData = await getPageData(
    { slug: ['pricing'] },
    locale,
    preview
  )

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { metadata, localizations, backgroundColor=null, shortTexts, longTexts, images } = pageData

  return {
    props: {
      preview,
      metadata,
      global: globalLocale,
      pageContext: {
        slug: pageData.slug,
        locale: pageData.locale,
        locales,
        defaultLocale,
        localizations,
        backgroundColor,
        texts: {
          shortTexts,
          longTexts
        },
        images,
        plans: priceData.contentSections.find(section => section.__component === 'sections.pricing').plans
      },
    },
  }
}

const Company = ({ metadata, global, pageContext }) => {

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const router = useRouter()
  
  useEffect(() => {
    const { title, price, annually, action } = router.query
    if (action === 'select-plan' && (currentStep === 0 || currentStep === 1)) {
      handleSelectPlan(title, price, annually)
    }
  }, [router.query])

  const handleChange = step => {
    setCurrentStep(step)
  }

  const handleSelectPlan = (title, price, annually) => {
    const obj = { title, price, annually }
    setSelectedPlan(obj);
    setCurrentStep(1)
  }

  const steps = [
    {
      content: (
        <div>
          <h3 className="text-3xl font-bold text-center">Choose the plan that works best for you</h3>
          <PricingContent plans={pageContext.plans} />
        </div>
      ),
      title: "Select Plan",
      icon: <BiSelectMultiple />,
    },
    {
      content: <div>Something</div>,
      title: "testtesttest",
      icon: <AiOutlineUser />,
    },
    {
      content: <div>Something</div>,
      title: "testtesttest",
      icon: <BiDollarCircle />,
    },
    {
      content: <div>Something</div>,
      title: "testtesttest",
      icon: <AiOutlineSmile />,
    },
  ];

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <h1 className='title mt-16 text-center'>INFLUENCIO</h1>
      <h2 className='text-2xl my-8 text-center'>Make the most of your marketing budget</h2>

      <div className='flex flex-col items-center'>
        <div className='max-w-screen-xl w-full'>
          <Steps steps={steps} currentStep={currentStep} />
        </div>

        <button onClick={() => handleChange(currentStep-1)}>back</button>
        <button onClick={() => handleChange(currentStep+1)}>forward</button>
      </div>
    </Layout>
  )
}

export default Company
