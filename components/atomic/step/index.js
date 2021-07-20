import React from 'react'
import classNames from 'classnames'

const Steps = ({ steps, currentStep=2 }) => {
  return (
    <div className="max-w-xl mx-auto my-4 pb-4">	
      <div className="flex pb-3">

        {
          steps.map((step, i) => (
            <Step key={i} step={step} currentStep={currentStep} last={i === steps.length - 1} index={i} />
          ))
        }

        {/* <div className="flex-1">
          <div className="w-10 h-10 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-white text-center w-full"><i className="fa fa-check w-full fill-current white"></i></span>
          </div>
        </div>


        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
            <div className="bg-green-300 text-xs leading-none py-1 text-center text-gray-800 rounded " style={{width: '100%'}}></div>
          </div>
        </div>
      
        
        <div className="flex-1">
          <div className="w-10 h-10 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-white text-center w-full"><i className="fa fa-check w-full fill-current white"></i></span>
          </div>
        </div>
      
        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
            <div className="bg-green-300 text-xs leading-none py-1 text-center text-gray-800 rounded " style={{width: '20%'}}></div>
          </div>
        </div>
      
        <div className="flex-1">
          <div className="w-10 h-10 bg-white border-2 border-gray-300 mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-gray-600 text-center w-full">3</span>
          </div>
        </div>
      
      
        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
            <div className="bg-green-300 text-xs leading-none py-1 text-center text-gray-800 rounded " style={{width: '0%'}}></div>
          </div>
        </div>


        <div className="flex-1">
          <div className="w-10 h-10 bg-white border-2 border-gray-300 mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-gray-600 text-center w-full">4</span>
          </div>
        </div>
      
      
        <div className="flex-1">
        </div>		
      </div>
      
      <div className="flex text-xs content-center text-center">
        <div className="w-1/4">
          Invitation received
        </div>
        
        <div className="w-1/4">
          Personal details
        </div>
        
        <div className="w-1/4">
          Application details
        </div>
        
        <div className="w-1/4">
          Confirmation
        </div>			 */}

      </div>
      {steps[currentStep].content}
    </div>
  )
}

const Step = ({ step, currentStep, last=false, index }) => {

  return (
    <>
      <div className='relative' style={{ minWidth: 100 }}>
        <div className="flex-1">
          <div className={
            classNames(
              `w-16 h-16 mx-auto rounded-full text-lg flex ${index === currentStep ? 'text-white' : 'text-gray-700'} items-center text-4xl flex justify-center`,
              {
                "bg-blue-100": index < currentStep
              },
              {
                "bg-blue-400": index === currentStep
              }
            )
          }>
            {step.icon}
          </div>
        </div>
        <div className='text-center'>{step.title}</div>
      </div>

      {
        !last ? <div style={{ marginTop: -20 }} className="mx-3 w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
            <div className={`${index < currentStep ? 'bg-blue-300' : 'bg-gray-300'} text-xs leading-none py-1 text-center text-gray-800 rounded`} style={{width: '100%'}}></div>
          </div>
        </div> : null
      }
    </>
  )
}



export default Steps
