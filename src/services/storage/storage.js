import Cookies from 'universal-cookie'

export const getItemsFromLocalStorage = (key) => {
  try {
    const items = localStorage.getItem(key)
    return items ? JSON.parse(items) : {}
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const setItemsInLocalStorage = (key, items) => {
  const dataToStore = JSON.stringify(items)
  localStorage.setItem(key, dataToStore)
}

export const getCookie = (key) => {
  const cookies = new Cookies()
  return cookies.get(key) || null
}

export const setCookie = (key, val) => {
  const cookies = new Cookies()
  return cookies.set(key, val) || null
}
