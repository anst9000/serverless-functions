require('dotenv').config()

const Airtable = require('airtable-node')
const airtable = new Airtable({ apiKey: process.env.ACCESS_TOKEN })
  .base(process.env.BASE_ID)
  .table(process.env.TABLE_NAME)

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters

  if (!id) {
    return {
      statusCode: 400,
      body: 'Please provide product id id=<ID>'
    }
  }

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
}
