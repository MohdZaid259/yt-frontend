function useLocalStorage(key, isArray=false) {

  const setData = (value) => {
    if(isArray){
      let existingData = JSON.parse(window.localStorage.getItem(key)) || [];
      existingData.push(value);
      window.localStorage.setItem(key, JSON.stringify(existingData))
    }else{
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getData = () => {
    const data = JSON.parse(window.localStorage.getItem(key));
    return isArray ? data || [] : data;
  };

  const removeData = (value) => {
    if(isArray){
      let existingData = JSON.parse(window.localStorage.getItem(key)) || [];
      existingData = existingData.filter((item)=>item.video.title !== value)
      window.localStorage.setItem(key, JSON.stringify(existingData));
    }else{
      window.localStorage.removeItem(key);
    }
  };

  const removeAll = () => {
    window.localStorage.removeItem(key);
  };

  return [setData, getData, removeData, removeAll];
}

export default useLocalStorage;