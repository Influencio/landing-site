import * as RadixCheckbox from '@radix-ui/react-checkbox';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { GoCheck } from "react-icons/go";

const Checkbox = ({ id='checkbox', label, defaultChecked, onChange, required, error }) => {
  const [checked, setChecked] = useState(() => defaultChecked);

  useEffect(() => {
    onChange && onChange(checked)
  }, [checked])

  return (
    <div>
      <div className='flex justify-between p-1 my-0 text-gray-900 lg:items-center'>
        <RadixCheckbox.Root required={required} onCheckedChange={setChecked} checked={checked} className={classNames(
          'flex items-center justify-center w-6 h-6 border border-gray-200 rounded-md shadow opacity-95 focus:opacity-100 max-w-1/12',
            {
            'bg-white': !checked,
            'text-white bg-blue-500': checked,
            'border-red-500': error
            })} id={id}>
          <RadixCheckbox.Indicator>
            <GoCheck />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        <label className='w-11/12 text-gray-900 cursor-pointer select-none' htmlFor={id}>
          {label}
        </label>
      </div>
      {error ? (
        <p className="text-red-500 text-xs italic">
          {error.message ||
            (error.type === "required" ? `${label} is required` : null)}
        </p>
      ) : null}
    </div>
  )
}

export default Checkbox