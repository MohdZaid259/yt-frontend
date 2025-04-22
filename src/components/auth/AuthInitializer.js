import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUser } from "@/store/slices/authSlice";

function AuthInitializer() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    async function log(){
      await dispatch(getCurrentUser())
    }
    log()
  },[dispatch])
  
  return null
}

export default AuthInitializer