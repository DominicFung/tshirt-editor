import React, { useEffect, useState } from 'react'

import ImageEditor from 'tui-image-editor'
import "tui-image-editor/dist/tui-image-editor.css"
import "tui-color-picker/dist/tui-color-picker.css"

import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'

import { v4 as uuidv4 } from 'uuid'

import emptyImage from '../../assets/empty.png'
import secret from '../../secret.json'
import cdkoutput from '../../cdk-outputs.json'
import { Credentials } from '@aws-sdk/types'

interface editorProps {
  file: File
}

export default function Editor({file}: editorProps) {
  const [ IE, setIE ] = useState<ImageEditor>()

  const saveToS3 = async (blob: Blob, filename: string) => {
    const client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: secret.accessKeyId,
        secretAccessKey: secret.secretAccessKey
      } as Credentials,
    })

    let array = await blob.arrayBuffer()
    console.log(array)

    const bucketParams = {
      Bucket: cdkoutput.TShirtEditor.bucketName,
      Key: filename,
      Body: blob
    } as PutObjectCommandInput

    try {
      const data = await client.send(new PutObjectCommand(bucketParams))
      console.log("Success", data)
      return data
    } catch (err) {
      console.log("Error", err)
      return err
    }
  }

  const setSaveAs = () => {
    (window as any).saveAs = (blob: Blob, filename: string) => {
      let url = URL.createObjectURL(blob)
      console.log("test 1")
      saveToS3(blob, `${uuidv4()}/${filename}`)
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