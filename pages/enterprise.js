import React from 'react'

const Enterprise = () => {
  const bgColor = '#2B3856'

  return (
    <div className='min-h-screen'>
      <div className={`h-16 w-screen text-white text-xl text-right flex justify-end items-center pr-8`} style={{ backgroundColor: bgColor }}>influencio enterprise</div>

      <div className='h-full grid grid-cols-2'>
        <div className='h-full col-span-2 md:col-span-1 p-8 md:p-16' style={{ backgroundColor: bgColor }}>
          <h1 className='text-6xl text-white'>We’re here for you at every touch point.</h1>
          <p className='text-lg text-white mt-6'>Schedule a call to learn how Influencio Enterprise can help your business build, grow, and manage enduring partnerships with influencers.</p>
        </div>
        <div className='h-full col-span-2 md:col-span-1 p-12 md:p-24'>
          <div className='max-w-4xl'>
            <h2 className='text-3xl mb-4'>Let’s talk influencer strategy</h2>
            <ContactUsForm />
          </div>
        </div>
      </div>
    </div>
  )
}

const ContactUsForm = () => {
  return (
    <div>Form</div>
  )
}

export default Enterprise
