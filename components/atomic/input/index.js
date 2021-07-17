import React from 'react'

const Input = React.forwardRef((props, ref) => {
  const { label, type, id } = props;
  return (
    <div>
      {
        label ? <label htmlFor={id} className='block text-gray-700 text-sm font-bold mb-2'>{label}</label> : null
      }
      <input ref={ref} {...props} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={type || 'text'} />
    </div>
)})

export default Input;