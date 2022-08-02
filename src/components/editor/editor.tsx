import React, { useEffect } from 'react'

import ImageEditor from 'tui-image-editor'
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";

import emptyImage from '../../assets/empty.png'

interface editorProps {
  file: File
}

export default function Editor({file}: editorProps) {

  useEffect(() => {
    const imageEditor = new ImageEditor(document.getElementById('tui-image-editor') as Element, { 
      usageStatistics: false,
      includeUI: {
        menu: ["shape", "filter", "text"],
        initMenu: "filter",
        uiSize: {
          width: window.innerWidth+"px",
          height: window.innerHeight+"px"
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
      },
      cssMaxWidth: window.innerWidth,
      cssMaxHeight: window.innerHeight,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70
      }
    })
  }, [])

  return (
    <>
      <div id="tui-image-editor"/>
    </>
    
  )
}