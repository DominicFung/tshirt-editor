import React from 'react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SaveIcon } from '@heroicons/react/outline'

interface FileNameModalProps {
  open: boolean,
  setOpen: (open: boolean) => void
  
  filename: string
  saveFile: (s: string) => void
}

export default function FileNameModal(props: FileNameModalProps) {
  const cancelButtonRef = useRef(null)

  const [filename, setFilename] = useState("")
  const [extension, setExtension] = useState("")

  useEffect(() => {
    if (props.filename && props.filename.includes(".")) {
      const fn = props.filename.split(".")
      if (props.filename.includes("/"))
        setFilename(props.filename.split("/")[-1].split(".")[0])
      else
        setFilename(fn[0])

      
      setExtension(fn[fn.length-1])
    } else {
      console.error("props.filename is null OR filename doesn't include '.': ", props.filename)
    }
  }, [props.filename])



  return (<>
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${props.open ? "block" : "hidden"}`}>.</div>
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full text-gray-100 sm:mx-0 sm:h-10 sm:w-10`}>
                      <SaveIcon className={`h-6 w-6 text-gray-600`} aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pr-12">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Save As
                      </Dialog.Title>
                      <div className="mb-4 pt-5 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                          File Name
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm w-full'>
                          
                          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                            value={filename} onChange={(e) => setFilename(e.target.value)} />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">.{extension}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`}
                    onClick={() => props.setOpen(false)}
                  >
                    Order Now!
                  </button>
                  <button
                    type="button"
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm`}
                    onClick={() => { props.saveFile(`${filename}.${extension}`) }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => props.setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  </>)
}