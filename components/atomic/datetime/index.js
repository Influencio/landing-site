import React from 'react'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'; 
import 'react-calendar/dist/Calendar.css'; 
import 'react-clock/dist/Clock.css'; 

import tw, { css } from 'twin.macro'

const style = css`
    .react-datetime-picker {
  display: inline-flex;
  position: relative;
}
.react-datetime-picker,
.react-datetime-picker *,
.react-datetime-picker *:before,
.react-datetime-picker *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.react-datetime-picker--disabled {
  ${tw`bg-gray-200 text-gray-800`}
}
.react-datetime-picker__wrapper {
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  ${tw`border relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm`}
}
.react-datetime-picker__inputGroup {
  min-width: calc(4px + (4px * 3) +  0.54em * 6  +  0.217em * 2);
  flex-grow: 1;
  padding: 0 2px;
}
.react-datetime-picker__inputGroup__divider {
  padding: 1px 0;
  white-space: pre;
}
.react-datetime-picker__inputGroup__input {
  min-width: 0.54em;
  height: calc(100% - 2px);
  position: relative;
  padding: 1px;
  border: 0;
  background: none;
  font: inherit;
  box-sizing: content-box;
  -moz-appearance: textfield;
}
.react-datetime-picker__inputGroup__input::-webkit-outer-spin-button,
.react-datetime-picker__inputGroup__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.react-datetime-picker__inputGroup__input:invalid {
  background: rgba(255, 0, 0, 0.1);
}
.react-datetime-picker__inputGroup__input--hasLeadingZero {
  margin-left: -0.54em;
  padding-left: calc(1px +  0.54em);
}
.react-datetime-picker__inputGroup__amPm {
  font: inherit;
  -moz-appearance: menulist;
}
.react-datetime-picker__button {
  border: 0;
  background: transparent;
  padding: 4px 6px;
}
.react-datetime-picker__button:enabled {
  cursor: pointer;
}
.react-datetime-picker__button:enabled:hover .react-datetime-picker__button__icon,
.react-datetime-picker__button:enabled:focus .react-datetime-picker__button__icon {
  stroke: #0078d7;
}
.react-datetime-picker__button:disabled .react-datetime-picker__button__icon {
  stroke: #6d6d6d;
}
.react-datetime-picker__button svg {
  display: inherit;
}
.react-datetime-picker__calendar,
.react-datetime-picker__clock {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
}
.react-datetime-picker__calendar--closed,
.react-datetime-picker__clock--closed {
  display: none;
}
.react-datetime-picker__calendar {
  width: 350px;
  max-width: 100vw;
}
.react-datetime-picker__calendar .react-calendar {
  border-width: thin;
}
.react-datetime-picker__clock {
  width: 200px;
  height: 200px;
  max-width: 100vw;
  padding: 25px;
  background-color: white;
  border: thin solid #a0a096;
}

  `

const Datetime = React.forwardRef((props, ref) => {
  
  return (
    <div ref={ref}>
      <DateTimePicker
        css={style}
        className='w-full'
        {...props}
      />
    </div>
  )
})

export default Datetime
