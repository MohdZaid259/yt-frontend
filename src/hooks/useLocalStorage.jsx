function useLocalStorage(key){

  const setData = (value) => {
    window.localStorage.setItem(key,JSON.stringify(value))
  }
  const getData = () => {
    return JSON.parse(window.localStorage.getItem(key))
  }
  const removeData = () => {
    window.localStorage.removeItem(key)
  }

  return [setData,getData,removeData]
}

export default useLocalStorage