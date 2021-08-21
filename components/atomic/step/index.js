import React from "react";
import classNames from "classnames";
import { GoCheck } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { Transition } from "@headlessui/react";

const Steps = ({ steps, currentStep = 2 }) => {
  return (
    <div className="w-full my-4 pb-4">
      <div className="w-full flex pb-3 flex-col md:flex-row">
        {steps.map((step, i) => (
          <Step
            key={i}
            step={step}
            currentStep={currentStep}
            last={i === steps.length - 1}
            index={i}
            disabled={step.disabled}
          />
        ))}
      </div>
      {steps[currentStep].content}
    </div>
  );
};

const Step = ({ step, currentStep, last = false, index, disabled=false }) => {
  return (
    <>
      <div
        className={classNames("relative my-4 flex md:flex-col items-center", {
          "opacity-60": disabled,
        })}
        style={{ minWidth: 100 }}
      >
        <div className="md:flex-1">
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

            {disabled ? (
              <div
                style={{
                  top: -5,
                  right: -5,
                }}
                className="absolute h-6 w-6 bg-gray-500 rounded-full text-lg text-white flex justify-center items-center"
              >
                <AiOutlineClose />
              </div>
            ) : (
              <Transition
                show={index < currentStep}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
              >
                <div
                  style={{
                    top: -5,
                    right: -5,
                  }}
                  className="absolute h-6 w-6 bg-blue-500 rounded-full text-lg text-white flex justify-center items-center"
                >
                  <GoCheck />
                </div>
              </Transition>
            )}
          </div>
        </div>
        <div className="text-left ml-3 md:ml-0 md:text-center font-bold text-xl md:text-base">
          {step.title}
        </div>
      </div>

      {!last ? (
        <div className="mx-3 w-2 md:w-full align-center items-center align-middle content-center flex md:mt-[-20px] ml-[25px] md:ml-0">
          <div className="h-4 md:h-2 w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
            <div
              className={`${
                index < currentStep ? "bg-blue-300" : "bg-gray-300"
              } text-xs leading-none py-1 text-center text-gray-800 rounded h-full`}
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Steps;
