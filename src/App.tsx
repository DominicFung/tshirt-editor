import React, { useState } from 'react'
import './styles/App.css'

import Dropzone from './components/dropzone'
import Editor from './components/editor/editor'

export default function App() {
  const [files, setFiles] = useState([] as File[])

  return (
    <div className="App">
      <h1>Test Drop</h1>
      {files.length === 0 && <Dropzone onDrop={setFiles} />}
      {files.length > 0 && <Editor file={files[0]}/>}
    </div>
  )
}
