import React, { useState } from 'react';
import Plans from './plans';
import { Switch } from '@headlessui/react'

const PricingContent = ({ handleSelect, plansToExclude, plans }) => {

  const [annually, setAnnually] = useState(false);

  return (
    <>
      <h1 className='text-4xl text-center'>Choose the plan that works best for you</h1>


      {/* <div tw='text-lg mt-3'>Monthly <Switch tw='mx-2' onChange={setAnnually} /> Annually <span tw='text-blue-500'>20% off</span></div> */}

      <Plans annually={annually} handleSelect={handleSelect} plansToExclude={plansToExclude} plans={plans} />
    </>
  );
};

export default PricingContent;