import { useEffect, useState } from 'react'
import './styles/App.css'

import Editor from './components/editor'
import Appbar from './components/appbar'
import UserModal from './components/usermodal'
import UploadStatusModal from './components/uploadstatusmodal'
import FileNameModal from './components/filenamemodal'

import secret from './secret.json'
import cdkoutput from './cdk-outputs.json'
import { Credentials } from '@aws-sdk/types'

import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'


const key = "x-tshirt-editor-user-key"
export interface status {
  status: "SUCCESS"|"ERROR", error: any
}

export default function App() {
  const [ userModalOpen, setUserModalOpen ] = useState(false)
  const [ userId, setUserId ] = useState<string|null>(localStorage.getItem(key))

  const [uploadStatus, setUploadStatus] = useState<status>({status: "SUCCESS", error: ""})
  const [uploadCompleteOpen, setUploadCompleteOpen] = useState(false)

  const [fileNameOpen, setFileNameOpen] = useState(false)
  const [blob, setBlob] = useState<Blob>()
  const [fileName, setFileName] = useState<string>("")


  useEffect(() => {
    if (!userId) { setUserModalOpen(true) }
  }, [])

  const saveAs = (blob: Blob, filename: string) => {
    setFileNameOpen(true)
    setFileName(filename)
    setBlob(blob)
  }

  const saveToS3 = async (blob: Blob|undefined, filename: string) => {
    if (blob) {
      setFileNameOpen(false)

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
        setUploadStatus({status: "SUCCESS", error: ""})
        return data
      } catch (err) {
        console.log("Error", err)
        setUploadStatus({status: "ERROR", error: err})
        return err
      } finally {
        setUploadCompleteOpen(true)
      }
    }
  }

  return (
    <div className="App">
      <Appbar setUserOpen={setUserModalOpen} userId={userId} />
      <Editor userId={userId} setUploadCompleteOpen={setUploadCompleteOpen} saveAs={saveAs}/>
      
      {/** MODALS */}
      <UserModal open={userModalOpen} setOpen={setUserModalOpen} userId={userId} setUserId={setUserId} />
      <UploadStatusModal open={uploadCompleteOpen} setOpen={setUploadCompleteOpen} status={uploadStatus}/>
      <FileNameModal open={fileNameOpen} setOpen={setFileNameOpen} filename={fileName} saveFile={(s: string) => saveToS3(blob, `${userId}/${s}`)}/>
    </div>
  )
}
