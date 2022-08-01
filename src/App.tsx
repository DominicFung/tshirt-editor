import React, { useState } from 'react'
import './styles/App.css'

import Dropzone from './components/dropzone'
import Editor from './components/editor/editor'
import Viewer3d from './components/editor/viewer'

export default function App() {
  const [files, setFiles] = useState([] as File[])
  const [toggleViewer, setToggleViewer] = useState(true)

  return (
    <div className="App">
      {files.length === 0 && <Dropzone onDrop={setFiles} />}
      {files.length > 0 && !toggleViewer && <Editor file={files[0]}/>}
      {files.length > 0 && toggleViewer && <Viewer3d file={files[0]}/>}
    </div>
  )
}
