'use client'

import React from 'react'
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux'
import {loginUser,getCurrentUser} from '../../store/slices/authSlice.js'
import { useRouter } from 'next/navigation.js'
import { useForm } from 'react-hook-form'
import useLocalStorage from '@/hooks/useLocalStorage.jsx'

function LoginAccount() {
  const { handleSubmit, register, formState:{ errors } } = useForm()
  const [setAuth,getAuth,removeAuth] = useLocalStorage('auth')

  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.auth?.loading)
  const router = useRouter()

  const submit = async (data) => {
    const res = await dispatch(loginUser(data))
    const user = await dispatch(getCurrentUser())

    setAuth(res.user)

    if(user && res?.payload) {
      router.replace('/')
    }
  }

  if(loading) return <>Loading...</>
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
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
  )
}

export default LoginAccount