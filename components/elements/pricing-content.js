import React, { useState } from 'react';
import Plans from './plans';
import { Switch } from '@headlessui/react'

const PricingContent = ({ handleSelect, plansToExclude, plans }) => {

  const [annually, setAnnually] = useState(false);

  return (
    <>
      <div className='flex space-x-4 justify-center items-center mt-6'>
        <span className='text-lg'>Monthly</span>
        <Switch
          checked={annually}
          onChange={setAnnually}
          className={`${annually ? 'bg-blue-500' : 'bg-blue-300'}
            relative inline-flex flex-shrink-0 h-[32px] w-[66px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${annually ? 'translate-x-9' : 'translate-x-0'}
              pointer-events-none inline-block h-[28px] w-[28px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
        <span className='text-lg'>Annually</span>
      </div>

      <Plans annually={annually} handleSelect={handleSelect} plansToExclude={plansToExclude} plans={plans} />
    </>
  );
};

export default PricingContent;