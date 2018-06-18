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
