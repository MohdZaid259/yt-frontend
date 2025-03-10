import useLocalStorage from '@/hooks/useLocalStorage.jsx'


export default function sendTokens(){
  const [setAccessToken,getAccessToken,removeAccessToken] = useLocalStorage('access')
  
  const accessToken = getAccessToken()

  return {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    }
  }
} 