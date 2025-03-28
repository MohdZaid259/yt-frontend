import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUser } from "@/store/slices/authSlice";

function AuthInitializer() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    function log(){
      dispatch(getCurrentUser())
    }
    log()
  },[])
  
  return null
}

export default AuthInitializer