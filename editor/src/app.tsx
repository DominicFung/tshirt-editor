import { useEffect, useState } from 'react'
import './styles/App.css'

import Editor from './components/editor'
import Appbar from './components/appbar'
import UserModal from './components/usermodal'

import secret from './secret.json'

const key = "x-tshirt-editor-user-key"

export default function App() {
  const [ userModalOpen, setUserModalOpen ] = useState(false)
  const [ userId, setUserId ] = useState<string|null>(localStorage.getItem(key))

  useEffect(() => {
    if (!userId) { setUserModalOpen(true) }
  }, [])

  return (
    <div className="App">
      <Appbar setUserOpen={setUserModalOpen} userId={userId} />
      <Editor />
      <UserModal open={userModalOpen} setOpen={setUserModalOpen} userId={userId} setUserId={setUserId} />
    </div>
  )
}
