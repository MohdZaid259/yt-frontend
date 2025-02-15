'use client'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, ArrowRight, Eye } from 'lucide-react'
import Link from "next/link"
import { logInAction } from "../../actions/login.js"

function Login() {

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-inherit ">
      <div className="max-w-md space-y-5 bg-white rounded-lg p-8 shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-black">Login your account</h1>
          <p className="text-muted-foreground">Welcome! Please enter the username & password.</p>
        </div>
        <Alert variant="destructive" className="bg-red-50 text-red-500 border-red-100">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Unable to complete action at this time. If the problem persists please contact support.
          </AlertDescription>
        </Alert>
        <form className="space-y-4" action={logInAction}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-black text-md font-medium">
              Username or Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-black text-md font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400"
              />
                <Eye className="absolute right-3 top-2 cursor-pointer  h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <button type="submit" className="w-full flex justify-center items-center rounded-md py-2 text-white bg-[#6C47FF] hover:bg-[#5535FF]">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
        <div className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don't an account?{' '}
            <Link href="/sign-in" className="text-[#6C47FF] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login