import React from 'react'

const Input = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={props.type || 'text'} />
))

export default Input;