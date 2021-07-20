import React, { useState } from 'react'
import Steps from 'components/atomic/step';
import {BiSelectMultiple, BiDollarCircle} from 'react-icons/bi'
import {AiOutlineUser, AiOutlineSmile} from 'react-icons/ai'
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"

import getCustomProps from "utils/custom-page-props";;
export const getStaticProps = getCustomProps(['register', 'company'])

const Company = ({ metadata, global, pageContext }) => {

  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = step => {
    setCurrentStep(step)
  }

  const steps = [
    {
      content: <div>Something</div>,
      title: 'test',
      icon: <BiSelectMultiple />
    },
    {
      content: <div>Something</div>,
      title: 'testtesttest',
      icon: <AiOutlineUser />
    },
    {
      content: <div>Something</div>,
      title: 'testtesttest',
      icon: <BiDollarCircle />
    },
    {
      content: <div>Something</div>,
      title: 'testtesttest',
      icon: <AiOutlineSmile />
    }
  ]

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
