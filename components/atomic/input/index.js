import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

const Input = React.forwardRef((props, ref) => {
  const { label, type, id, error } = props;

  const originalInputType = type || 'text';
  const [inputType, setInputType] = useState(type || 'text')

  return (
    <div>
      {
        label ? <label htmlFor={id} className='block text-gray-700 text-sm font-bold mb-2'>{label}</label> : null
      }
      <div className='relative flex items-center'>
        <input ref={ref} {...props} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`} type={inputType} />
        {
          originalInputType === 'password' ? (
            inputType === 'password' ? <AiOutlineEyeInvisible onClick={() => setInputType('text')} class="cursor-pointer absolute right-4 text-gray-600 text-xl" />
            : <AiOutlineEye onClick={() => setInputType('password')} class="cursor-pointer absolute right-4 text-gray-600 text-xl" />
          ) : null
        }
      </div>
      {
        error ? <p className="text-red-500 text-xs italic">{error.type === 'required' ? `${label} is required` : null}</p> : null
      }
    </div>
)})

export default Input;