require('dotenv').config()

const Airtable = require('airtable-node')
const airtable = new Airtable({ apiKey: process.env.ACCESS_TOKEN })
  .base(process.env.BASE_ID)
  .table(process.env.TABLE_NAME)

exports.handler = async (event, context) => {
  try {
    const { records } = await airtable.list()
    const products = records.map(product => {
      const { id } = product
      const { name, image, price } = product.fields
      const url = image[0].url
      return { id, name, url, price }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Server Error' + error.response)
    }
  }
}
