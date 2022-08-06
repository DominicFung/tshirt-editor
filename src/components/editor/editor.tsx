import React, { useEffect, useState } from 'react'

import ImageEditor from 'tui-image-editor'
import "tui-image-editor/dist/tui-image-editor.css"
import "tui-color-picker/dist/tui-color-picker.css"
// import FileSaver from 'file-saver'

import emptyImage from '../../assets/empty.png'
import secret from '../../secret.json'

interface editorProps {
  file: File
}

export default function Editor({file}: editorProps) {
  const [ IE, setIE ] = useState<ImageEditor>()

  const oauth = () => {
    let url = `https://www.printful.com/oauth/token?client_secret=${secret.token}`
    let res = fetch(url, {
      method: 'POST',
      mode: 'no-cors',
    })
  }

  const uploadFile = async (url: string, filename: string) => {
    let res = await fetch('https://api.printful.com/files', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({
        "type": "default",
        "url": url,
        "filename": filename
      }),
      headers: {
        "X-PF-Store-Id": "Tshirt-editor-demo",
        'Authorization': `Bearer ${secret.token}`,
        'Content-Type': 'application/json'
      }
    })

    console.log(res)
    alert("File sent to Printful for processing.")
    return res
  }

  const setSaveAs = () => {
    (window as any).saveAs = (blob: Blob, filename: string) => {
      let url = URL.createObjectURL(blob)
      //uploadFile(url, filename)
      oauth()
    }
  }

  useEffect(() => {
    setSaveAs()
    let imageEditor = new ImageEditor(document.getElementById('tui-image-editor') as Element, { 
      usageStatistics: false,
      includeUI: {
        menu: ["shape", "filter", "text"],
        initMenu: "filter",
        uiSize: {
          width: window.innerWidth+"px",
          height: window.innerHeight+"px"
        },
        locale: {
          Download: "Printful Upload",
          Load: "Add Image"
        },
        menuBarPosition: "right",
        theme: {
          'common.bi.image': emptyImage,
          'common.backgroundColor': '#fafafa',
          'submenu.backgroundColor': '#d4d4d4',
          'submenu.partition.color': '#262626',
          'submenu.normalLabel.color': '#262626',
          'submenu.activeLabel.color': '#262626',
          'colorpicker.title.color': '#262626',


        } as tuiImageEditor.IThemeConfig
      } as tuiImageEditor.IIncludeUIOptions,
      cssMaxWidth: window.innerWidth,
      cssMaxHeight: window.innerHeight,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70
      }
    })

    setIE(imageEditor)
  }, [])

  useEffect(() => {
    if (IE) {
      window.addEventListener('resize', updateWindowDimensions)
      return () => { window.removeEventListener('resize', updateWindowDimensions); setIE(undefined) }
    }
  }, [IE])

  const updateWindowDimensions = () => {
    if (IE) {
      IE.ui.resizeEditor({ 
        uiSize: {
          width: window.innerWidth+"px",
          height: window.innerHeight+"px"
        }
      } as tuiImageEditor.IEditorSize)
    } else { console.log("unable to resize") }
  }

  return (
    <>
      <div id="tui-image-editor"/>
    </>
  )
}