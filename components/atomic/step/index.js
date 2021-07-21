import React from 'react'
import classNames from 'classnames'
import {GoCheck} from 'react-icons/go'

const Steps = ({ steps, currentStep=2 }) => {
  return (
    <div className="w-full my-4 pb-4">	
      <div className="w-full flex pb-3">

        {
          steps.map((step, i) => (
            <Step key={i} step={step} currentStep={currentStep} last={i === steps.length - 1} index={i} />
          ))
        }

      </div>
      {steps[currentStep].content}
    </div>
  )
}

const Step = ({ step, currentStep, last=false, index }) => {

  return (
    <>
      <div className="relative" style={{ minWidth: 100 }}>
        <div className="flex-1">
          <div
            className={classNames(
              `relative w-16 h-16 mx-auto rounded-full text-lg flex ${
                index === currentStep ? "text-white" : "text-gray-700"
              } items-center text-4xl flex justify-center`,
              {
                "bg-blue-100": index < currentStep,
              },
              {
                "bg-blue-400": index === currentStep,
              }
            )}
          >
            <span>{step.icon}</span>

            <div
              style={{
                top: -5,
                right: -5,
              }}
              className={classNames(
                "absolute h-6 w-6 bg-blue-500 rounded-full text-lg text-white flex justify-center items-center",
                {
                  hidden: index >= currentStep,
                }
              )}
            >
              <GoCheck />
            </div>
          </div>
        </div>
        <div className="text-center">{step.title}</div>
      </div>

      {!last ? (
        <div
          style={{ marginTop: -20 }}
          className="mx-3 w-full align-center items-center align-middle content-center flex"
        >
          <div className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
            <div
              className={`${
                index < currentStep ? "bg-blue-300" : "bg-gray-300"
              } text-xs leading-none py-1 text-center text-gray-800 rounded`}
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      ) : null}
    </>
  );
}



export default Steps
