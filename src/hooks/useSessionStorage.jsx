function useSessionStorage(key) {

  const setData = (value) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getData = () => {
    if (typeof window !== "undefined") {
      const storedValue = window.sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    }
    return null;
  };

  const removeData = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(key);
    }
  };

  return [setData, getData, removeData];
}

export default useSessionStorage;