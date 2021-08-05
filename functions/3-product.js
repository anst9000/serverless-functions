require('dotenv').config()
const Airtable = require('airtable-node');
const ENV = process.env

const airtable = new Airtable({ apiKey: ENV.AIRTABLE_API_KEY })
  .base(ENV.AIRTABLE_BASE)
  .table(ENV.AIRTABLE_TABLE)

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters

  if (id) {
    try {
      const product = await airtable.retrieve(id)

      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id ${id}`,
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify(product)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server error`,
      }
    }
  } else {
    return {
      statusCode: 400,
      body: 'Please provide product id',
    }
  }
}