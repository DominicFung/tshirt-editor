
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { UserAddIcon } from '@heroicons/react/outline'

import { v4 as uuidv4 } from 'uuid'

const key = "x-tshirt-editor-user-key"

interface UserModalProps {
  open: boolean,
  setOpen: (open: boolean) => void

  userId: string | null,
  setUserId: (userId: string) => void
}

export default function UserModal(props: UserModalProps) {
  const bgRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)
  
  const startStateOpen = props.open
  const tempUserId = uuidv4()
  const [ userId, setUserId ] = useState<string|null>(props.userId)

  const saveUserId = () => {
    if (!userId) { 
      setUserId(tempUserId)
      localStorage.setItem(key, tempUserId)
      props.setUserId(tempUserId)
      console.log("temp user id saved. ", tempUserId)
    } else {
      localStorage.setItem(key, userId)
      props.setUserId(userId)
      console.log("user id saved. ", userId)
    }
    
    props.setOpen(false)
  }

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
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:hidden">
                    <UserAddIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 pt-4 font-medium text-gray-900 flex flex-row">
                        <span className='mx-auto flex justify-start items-center'>User Setup</span>
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 py-4">
                        Seems like you haven't set up your user yet! Please enter a username for us to remember you by.
                      </p>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                          Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                          value={userId === null ? tempUserId : userId} onChange={(e) => setUserId(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={saveUserId}
                >Ok</button>
                <button
                  type="button"
                  disabled={ localStorage.getItem(key) === null }
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-25 disabled:cursor-not-allowed"
                  onClick={() => props.setOpen(false)}
                >Cancel</button>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  </>)
}