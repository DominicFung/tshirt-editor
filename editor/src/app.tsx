import React, { useEffect, useState } from 'react'
import './styles/App.css'

import Dropzone from './components/dropzone'
import Editor from './components/editor/editor'
import Viewer3d from './components/editor/viewer'
import Appbar from './components/appbar'

import secret from './secret.json'

export default function App() {
  const [files, setFiles] = useState([] as File[])
  const [toggleViewer, setToggleViewer] = useState(false)

  const getProducts = async () => {
    let res = await fetch('https://api.printful.com/products', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        "X-PF-Store-Id": "Tshirt-editor-demo",
        'Authorization': `Bearer ${secret.token}`,
        'Content-Type': 'application/json'
      }
    })

    console.log(res)
    return res
  }

  useEffect(() => {
    //getProducts()
  }, [])

  return (
    <div className="App">
      {/*<Appbar />*/}
      {/*files.length === 0 && <Dropzone onDrop={setFiles} />*/}
      {files.length === 0 && !toggleViewer && <Editor file={files[0]}/>}
      {files.length > 0 && toggleViewer && <Viewer3d file={files[0]}/>}
    </div>
  )
}
