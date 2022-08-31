
import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/outline'

import secret from '../secret.json'
import { status } from '../app'

interface UploadStatusModalProps {
  open: boolean,
  setOpen: (open: boolean) => void
  status: status
}

export default function UploadStatusModal(props: UploadStatusModalProps) {
  const bgRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)

  const startStateOpen = props.open
  const [c, setC] = useState<"green"|"red">("red")

  useEffect(() => {
    if (props.status.status === 'SUCCESS') setC('green')
    else setC('red')
  }, [props.status])

  useEffect(() => {
    let [bg, fg] = [bgRef.current, fgRef.current]

    if (props.open && bg && fg) {
      bg.classList.replace("hidden", "block")
      fg.classList.replace("hidden", "block")

      setTimeout((bg: HTMLElement, fg: HTMLElement) => {
        bg.classList.replace("opacity-0", "opacity-100")
        fg.classList.replace("opacity-0", "opacity-100")
      }, 100, bg, fg)
    } else if (!props.open && bg && fg) {
      bg.classList.replace("opacity-100", "opacity-0")
      fg.classList.replace("opacity-100", "opacity-0")

      setTimeout((bg: HTMLElement, fg: HTMLElement) => {
        bg.classList.replace("block", "hidden")
        fg.classList.replace("block", "hidden")
      }, 300, bg, fg)
    }
  }, [props.open])

  return (<>
    <div ref={bgRef} className={`fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out ${startStateOpen ? "block opacity-100": "opacity-0 hidden"}`}>.</div>
    <div ref={fgRef} className={`relative z-20 transition-opacity ${startStateOpen ? "block opacity-100": "opacity-0 hidden"}`}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <>
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full text-${c}-100 sm:mx-0 sm:h-10 sm:w-10`}>
                    <CheckCircleIcon className={`h-6 w-6 text-${c}-600`} aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Upload {props.status.status}!
                    </h3>
                    <div className="mt-2">
                      {props.status.status === 'SUCCESS' && 
                        <p className="text-sm text-gray-500">
                          Upload is successful! We'll contact <a href={`mailto:${secret.mail}`} className={'text-blue-500 underline'}>{secret.mail}</a> shortly!
                        </p>}
                      {props.status.status === 'ERROR' && 
                        <p className="text-sm text-gray-500">
                          There was an issue with your upload, Please contact <a href={`mailto:${secret.mail}`} className={'text-blue-500 underline'}>{secret.mail}</a>. Sorry for the inconvinence.
                        </p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-${c}-600 text-base font-medium text-white hover:bg-${c}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${c}-500 sm:ml-3 sm:w-auto sm:text-sm`}
                  onClick={() => props.setOpen(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  </>)
}