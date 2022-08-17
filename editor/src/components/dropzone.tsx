import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

interface myDropzoneProps {
  onDrop: (files: File[]) => void
}

export default function MyDropzone({onDrop}: myDropzoneProps) {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}