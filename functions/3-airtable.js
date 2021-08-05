require('dotenv').config()
const Airtable = require('airtable-node');
const ENV = process.env

const airtable = new Airtable({ apiKey: ENV.AIRTABLE_API_KEY })
  .base(ENV.AIRTABLE_BASE)
  .table(ENV.AIRTABLE_TABLE)

exports.handler = async (event, context) => {
  try {
    const { records } = await airtable.list()

    const products = records.map(product => {
      const { id } = product;
      const { name, image, price } = product.fields
      const url = image[0].url

      return { id, name, url, price }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server error"
    }
  }
}