import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { SaveIcon } from '@heroicons/react/outline'

interface FileNameModalProps {
  open: boolean,
  setOpen: (open: boolean) => void
  
  filename: string
  saveFile: (s: string) => void
}

export default function FileNameModal(props: FileNameModalProps) {
  const bgRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)

  const startStateOpen = props.open
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
                    <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full text-gray-100 sm:mx-0 sm:h-10 sm:w-10`}>
                      <SaveIcon className={`h-6 w-6 text-gray-600`} aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pr-12">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Save As
                      </h3>
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
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
        
      
  </>)
}