import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loginUser } from "@/store/slices/authSlice";

function AuthInitializer() {

  const dispatch = useDispatch()
  useEffect(()=>{
    async function log(){
      await dispatch(loginUser())
    }
    log()
  },[])
  
  return null
}

export default AuthInitializer