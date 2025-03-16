function useLocalStorage(key) {

  const setData = (value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getData = () => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    }
    return null;
  };

  const removeData = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  };

  return [setData, getData, removeData];
}

export default useLocalStorage;