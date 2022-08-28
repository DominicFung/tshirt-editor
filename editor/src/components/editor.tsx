import { useEffect, useState } from 'react'

import ImageEditor from 'tui-image-editor'
import "tui-image-editor/dist/tui-image-editor.css"
import "tui-color-picker/dist/tui-color-picker.css"

import emptyImage from '../assets/empty.png'


interface editorProps {
  userId: string|null
  setUploadCompleteOpen: (b: boolean) => void
  saveAs: (blob: Blob, filename: string) => void
}

export default function Editor( props: editorProps) {
  const [ IE, setIE ] = useState<ImageEditor>()

  const setSaveAs = () => {
    // (window as any).saveAs = async (blob: Blob, filename: string) => {
    //   await saveToS3(blob, `${props.userId}/${fn}`)
    //   props.setUploadCompleteOpen(true)
    // }
    (window as any).saveAs = props.saveAs
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
          Download: "Upload & Notify",
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
  }, [props.userId])

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