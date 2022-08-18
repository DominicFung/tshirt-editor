//import AWS from 'aws-sdk'

//const BUCKET_NAME = process.env.BUCKET_NAME || '';
//const PLATFORM = process.env.PLATFORM || '';

export const handler = async (event: any): Promise<any> => {
  console.log('event: ', JSON.stringify(event, null, 4))
  return {
    body: JSON.stringify({message: 'Success'}),
    statusCode: 200
  }
}
