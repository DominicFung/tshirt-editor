import React, { useState } from 'react'
import './styles/App.css'

import Dropzone from './components/dropzone'
import Editor from './components/editor/editor'
import Viewer3d from './components/editor/viewer'
import Appbar from './components/appbar'

export default function App() {
  const [files, setFiles] = useState([] as File[])
  const [toggleViewer, setToggleViewer] = useState(false)

  return (
    <div className="App">
      {/*<Appbar />*/}
      {/*files.length === 0 && <Dropzone onDrop={setFiles} />*/}
      {files.length === 0 && !toggleViewer && <Editor file={files[0]}/>}
      {files.length > 0 && toggleViewer && <Viewer3d file={files[0]}/>}
    </div>
  )
}
