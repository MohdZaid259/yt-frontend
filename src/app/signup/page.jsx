'use client'

import { ArrowRight } from 'lucide-react'
import Link from "next/link"
import { useDispatch } from 'react-redux'
import {registerUser} from '../../store/slices/authSlice.js'
import { useRouter } from 'next/navigation.js'

function CreateAccount() {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}: ${value}`);
  // }
    const result = await dispatch(registerUser(formData))
    console.log('result ',result)
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="max-w-md bg-gray-800 text-white rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Create your account</h1>
          <p className="text-muted-foreground">Welcome! Please fill in the details to get started.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mt-4 flex gap-[61px] items-center">
            <label htmlFor="avatar" className="text-white text-md font-medium">
              Avatar
            </label>
            <input name="avatar" id="avatar" type="file" />
          </div>
          <div className="w-full flex gap-5 items-center">
            <label htmlFor="coverImage" className="text-white text-md font-medium">
              CoverImage
            </label>
            <input name="coverImage" id="coverImage" type="file"/>
          </div>
          <div className=" flex justify-center items-center gap-8">
            <label htmlFor="username" className="text-white text-md font-medium">
              Username
            </label>
            <input name="username" id="username" type="text" placeholder="Enter your username"
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div> 
          <div className="  flex justify-center items-center gap-10">
            <label htmlFor="fullname" className="text-white text-md font-medium">
              Fullname
            </label>
            <input name="fullname" id="fullname" type="text" placeholder="Enter your fullname"
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div> 
          <div className="flex justify-center items-center gap-16">
            <label htmlFor="email" className="text-white text-nowrap text-md font-medium">
              Email
            </label>
            <input name="email" id="email" required type="email" placeholder="Enter your email address"
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div> 
          <div className="flex justify-center items-center gap-8">
            <label htmlFor="password" className="text-white text-md font-medium">
              Password
            </label>
            <input name="password" id="password" minLength='6' type="password" placeholder="Enter your password"
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div>
          <button type="submit" className="w-full flex justify-center items-center rounded-md py-2 text-white bg-[#6C47FF] hover:bg-[#5535FF]">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
        <div className="mt-2 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-[#6C47FF] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default CreateAccount