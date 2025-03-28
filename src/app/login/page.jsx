'use client'

import React, { useEffect } from 'react'
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux'
import {loginUser,getCurrentUser} from '@/store/slices/authSlice.js'
import { useRouter } from 'next/navigation.js'
import { useForm } from 'react-hook-form'
import useLocalStorage from '@/hooks/useLocalStorage.jsx'
import useSessionStorage from '../../hooks/useSessionStorage'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

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
    
    setAuth(res.payload?.user)
    setAccessToken(res.payload?.accessToken)
    setRefreshToken(res.payload?.refreshToken)

    if(user && res?.payload) {
      router.replace('/')
    }
  }

  if(loading) return <>Loading...</>
  return (
    <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {Object.keys(errors).length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {Object.values(errors).map((error, index) => (
                    <p key={index}>{error.message}</p>
                  ))}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-1">
              <Label htmlFor="emailOrUsername">Email or Username</Label>
              <Input
                id="emailOrUsername"
                placeholder="Enter your email address" 
                { ...register('email',{required:true}) }
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                { ...register('password',{required:true, minLength:6 }) }
              />
            </div>

            <div className="flex items-center space-x-1">
              <Checkbox
                id="rememberMe"
                checked={'rememberMe'}
                onCheckedChange={(checked) => setRememberMe()}
              />
              <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                Remember me
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary text-blue-600 underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginAccount