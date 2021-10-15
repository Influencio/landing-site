import React from 'react'
import ReactDatePicker from 'react-date-picker/dist/entry.nostyle'; 
import 'react-calendar/dist/Calendar.css'; 

const DatePicker = React.forwardRef((props, ref) => {
  const { label, id, description } = props;
  return (
    <div ref={ref}>
      {label ? (
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
      ) : null}
      <ReactDatePicker
        className='w-full'
        format='dd/MM/y'
        {...props}
      />
      {description ? <small className='text-gray-500'>{description}</small> : null}
    </div>
  )
})

export default DatePicker
