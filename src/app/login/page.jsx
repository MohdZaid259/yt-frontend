'use client'

import React, { useEffect } from 'react'
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux'
import {loginUser,getCurrentUser} from '@/store/slices/authSlice.js'
import { useRouter } from 'next/navigation.js'
import { useForm } from 'react-hook-form'
import useLocalStorage from '@/hooks/useLocalStorage.jsx'
import useSessionStorage from '../../hooks/useSessionStorage'

function LoginAccount() {
  const { handleSubmit, register, formState:{ errors } } = useForm()

  const [setAuth,getAuth,removeAuth] = useLocalStorage('auth')
  const [setAccessToken,getAccessToken,removeAccessToken] = useSessionStorage('access')
  const [setRefreshToken,getRefreshToken,removeRefreshToken] = useSessionStorage('refresh')

  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.auth?.loading)
  const router = useRouter()

  useEffect(()=>{
    const token = getAccessToken()
    if(token) router.replace('/')
  },[])

  const submit = async (data) => {
    const res = await dispatch(loginUser(data))
    const user = await dispatch(getCurrentUser())
    
    setAuth(res.payload.user)
    setAccessToken(res.payload.accessToken)
    setRefreshToken(res.payload.refreshToken)

    if(user && res?.payload) {
      router.replace('/')
    }
  }

  if(loading) return <>Loading...</>
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className="max-w-md bg-gray-800 text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login </h2>
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input type="email" placeholder="Enter your email address" { ...register('email',{required:true}) }
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg mt-1"
            />
          </div>
          {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input type="password" placeholder="Enter your password" { ...register('password',{required:true, minLength:6 }) } className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg mt-1"
            />
          </div>
          {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
          <div className="mt-2 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?
              <Link href="/signup" className="text-[#6C47FF] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
      </div>
    </div>
  )
}

export default LoginAccount