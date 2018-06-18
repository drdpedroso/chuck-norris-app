const BASE_URL = 'http://api.icndb.com/'

export const getNRandomJokes = async (numberOfJokes = 1) => {
  const urlToFetch = `${BASE_URL}jokes/random/${numberOfJokes}`
  const response = await fetch(urlToFetch)
  return response.json()
}
