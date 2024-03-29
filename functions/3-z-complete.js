require('dotenv').config()

const Airtable = require('airtable-node')
const airtable = new Airtable({ apiKey: process.env.ACCESS_TOKEN })
  .base(process.env.BASE_ID)
  .table(process.env.TABLE_NAME)

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters

  if (id) {
    try {
      const product = await airtable.retrieve(id)

      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with ID ${id}`
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify(product)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server Error`
      }
    }
  } else {
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
}
