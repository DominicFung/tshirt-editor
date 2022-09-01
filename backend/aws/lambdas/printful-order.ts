import fetch from 'node-fetch'

const PLATFORM = process.env.PLATFORM || '';
const TOKEN = process.env.TOKEN || '';

interface PrintfulRecipient {
  name: string
  address1: string
  city: string
  state_code: string
  country_code: string
  zip: string
}

interface PrintfulItem {
  variant_id: number
  quantity: number
  files: {
    type: "front"|"back"
    url: string
  }[]
}

interface PrintfulPackageSlip {
  email: string
  phone: string
  message: string
  logo_url: string
}

interface PrintfulOrder {
  recipient: PrintfulRecipient
  items: PrintfulItem[]
  packing_slip: PrintfulPackageSlip
}

const postOrder = async (printful: PrintfulOrder) => {
  let res = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      //"X-PF-Store-Id": "Tshirt-editor-demo",
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(printful)
  })

  console.log(res)
  return res
}

export const handler = async (event: any = {}): Promise<any> => {
  console.log('event: ', JSON.stringify(event, null, 4))
  if (!event.body) {
    return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
  }

  if (PLATFORM === 'api.printful.com') {
    let res = postOrder(event.body as PrintfulOrder)
    
  } else {
    return {
      body: JSON.stringify({message: "The platform you configured is not supported yet."}),
      statusCode: 400
    }
  }


}