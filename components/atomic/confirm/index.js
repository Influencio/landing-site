import React, { useEffect, useState } from 'react'

import Modal from '../modal'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { BiError } from 'react-icons/bi'
import Button from '../button'


const Confirm = ({ children, title, type, text, onOk, icon, okText='Ok', cancelText='Cancel', open, disableCancel }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!icon) {
    if (type) {
      switch(type) {
        case 'success':
          icon = <FaCheckCircle className='text-green-500' />
          break;
        case 'warning':
          icon = <FaExclamationCircle className='text-yellow-500' />
          break;
        case 'danger':
          icon = <BiError className='text-red-500' />
          break;
        default:
          icon = null
      }
    }
  }

  const handleOk = () => {
    setIsOpen(false)
    onOk?.()
  }

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  return (
    <Modal
      trigger={children}
      title=''
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      verticalCenter
    >
      <div className='space-y-4'>
        <div className='flex space-x-3 items-center'>
          {icon ? (
            <div className='text-4xl'>
              {icon}
            </div>
          ) : null}
          <h5 className='font-bold text-xl'>{title}</h5>
        </div>

        <div>{text}</div>

        <div className='flex justify-end space-x-2'>
          {
            !disableCancel ? <Button onClick={() => setIsOpen(false)}>{cancelText}</Button> : null
          }
          <Button onClick={handleOk} danger={type === 'danger'} type='primary'>{okText}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default Confirm