import React from 'react'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'; 
import 'react-calendar/dist/Calendar.css'; 
import 'react-clock/dist/Clock.css'; 

const Datetime = React.forwardRef((props, ref) => {
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
      <DateTimePicker
        className='w-full'
        format='dd/MM/y HH:mm'
        {...props}
      />
      {description ? <small className='text-gray-500'>{description}</small> : null}
    </div>
  )
})

export default Datetime
