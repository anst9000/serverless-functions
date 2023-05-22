const result = document.querySelector('.result')

const fetchData = async () => {
  try {
    const response = await axios('/api/1-hello')

    console.log('--> response', response)
    result.textContent = response.data
  } catch (error) {
    console.error(error.response.data)
  }
}

fetchData()
