//import AWS from 'aws-sdk'
import fetch from 'node-fetch'

const BUCKET_NAME = process.env.BUCKET_NAME || '';
const PLATFORM = process.env.PLATFORM || '';
const TOKEN = process.env.TOKEN || '';

const postFiles = async (url: string, filename: string) => {

  /** 
   * filename = bucket object key: <user folder>/<img name>.png
   * Change "/" to ":"
   */
  
  let fn = filename.replace(/\//g, ":")
  let res = await fetch('https://api.printful.com/files', {
    method: 'POST',
    headers: {
      "X-PF-Store-Id": "Tshirt-editor-demo",
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "type": "default",
      "url": url,
      "filename": fn
    })
  })

  console.log(res)
  return res
}

export const handler = async (event: any): Promise<any> => {
  console.log('event: ', JSON.stringify(event, null, 4))
  
  let filename = event.Records[0].s3.object.key
  let url = `https://${BUCKET_NAME}.s3.amazonaws.com/${filename}`
  let eventName = event.Records[0].eventName

  if (eventName !== 'ObjectCreated:Put') {
    return {
      body: JSON.stringify({message: 'Not ObjectCreated:Put event.'}),
      statusCode: 200
    }
  }

  if (PLATFORM === 'api.printful.com') { 
    let res = await postFiles(url, filename)
    console.log(res)
  } else {
    console.log('Not supported platform')
    console.log('Platform: ', PLATFORM)
  }

  return {
    body: JSON.stringify({message: 'Success!'}),
    statusCode: 200
  }
}
