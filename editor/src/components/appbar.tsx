import React from 'react'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon, CogIcon } from '@heroicons/react/outline'

interface AppbarProps {
  userId: string | null,
  setUserOpen: (open: boolean) => void
}

export default function Appbar({ userId, setUserOpen }: AppbarProps) {
  return (
    <nav style={{backgroundColor: "#151515"}}>
      <div className="mx-auto px-2 sm:px-4">
        <div className="relative flex items-center justify-between h-10">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="block">
              <div className="flex space-x-4">
                  <span
                    className={'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
                  >
                    {userId || "No User"}
                  </span>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              onClick={() => setUserOpen(true)}
              className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">User Settings</span>
              <CogIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}