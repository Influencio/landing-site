import React from 'react'

const Textarea = React.forwardRef((props, ref) => {
  const { label, id, description, error, className, rows } = props;
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
      <div className="flex w-full">
        <div className="relative flex items-center w-full">
      <textarea
        rows={rows || 5}
        className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error ? "border-red-500" : ""
            } ${className || ''}`}
        {...props}
      />
      </div>
      </div>
      {description ? <small className='text-gray-500'>{description}</small> : null}
      {error ? (
        <p className="text-red-500 text-xs italic">
          {error.message ||
            (error.type === "required" ? `${label} is required` : null)}
        </p>
      ) : null}
    </div>
  )
})

export default Textarea
