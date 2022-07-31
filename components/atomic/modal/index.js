import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Modal = ({ open, onOpen, onClose, trigger, title, children, modalClassName, unstyledBody, verticalCenter }) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
    onClose?.()
  }

  function openModal() {
    setIsOpen(true)
    onOpen?.()
  }

  useEffect(() => {
    if (open) {
      openModal()
    } else {
      closeModal()
    }
    // eslint-disable-next-line
  }, [open])

  return (
    <>
      {trigger ? <button onClick={openModal}>{trigger}</button> : null}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`fixed inset-0 z-10 overflow-y-auto ${modalClassName || ''}`}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center mx-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            {
              verticalCenter ? (
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
              ) : null
            }
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-50"
            >
              {/* {children} */}
              {
                unstyledBody ? (
                  children
                ) : (
                  <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
                    {title ? (
                      <Dialog.Title
                        as="h3"
                        className="text-xl mb-4 font-medium leading-6 text-gray-900 dark:text-gray-100"
                      >
                        {title}
                      </Dialog.Title>
                    ) : null}
                    {children}
                  </div>
                )
              }
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal