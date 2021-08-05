let HEADERS = {
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
  'Content-Type': 'application/json', //optional
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '8640'
}

//This solves the "No ‘Access-Control-Allow-Origin’ header is present on the requested resource."
HEADERS['Access-Control-Allow-Origin'] = '*'
HEADERS['Vary'] = 'Origin'

exports.handler = async(event, context) => {
  return {
    statusCode: 200,
    body: 'First Netlify Function',
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    }
    // headers: HEADERS
  }
}