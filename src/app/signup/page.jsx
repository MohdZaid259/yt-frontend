'use client'

import { ArrowRight } from 'lucide-react'
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux'
import {registerUser} from '../../store/slices/authSlice.js'
import { useRouter } from 'next/navigation.js'
import { useForm } from 'react-hook-form'

function CreateAccount() {
  const { handleSubmit, register, setValue, formState:{ errors } } = useForm()
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.auth?.loading)
  const router = useRouter()

  const submit = async (data) => {
    const result = await dispatch(registerUser(data))
    console.log(result)
    router.replace('/')
  }

  if(loading) return <>Loading...</>
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="max-w-md bg-gray-800 text-white rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Create your account</h1>
          <p className="text-muted-foreground">Welcome! Please fill in the details to get started.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <div className="mt-4 flex gap-[61px] items-center">
            <label className="text-white text-md font-medium">
              Avatar
            </label>
            <input type="file" required onChange={(e) => setValue('avatar',e.target.files[0])}/>
          </div>
          <div className="w-full flex gap-5 items-center">
            <label className="text-white text-md font-medium">
              CoverImage
            </label>
            <input type="file" onChange={(e) => setValue('coverImage', e.target.files[0])}/>
          </div>
          <div className=" flex justify-center items-center gap-8">
            <label className="text-white text-md font-medium">
              Username
            </label>
            <input type="text" placeholder="Enter your username" { ...register('username',{required:true}) }
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div> 
          {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          <div className="flex justify-center items-center gap-10">
            <label className="text-white text-md font-medium">
              Fullname
            </label>
            <input type="text" placeholder="Enter your fullname" { ...register('fullname',{required:true}) }
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div> 
          {errors.fullname && (
              <span className="text-red-500">{errors.fullname.message}</span>
            )}
          <div className="flex justify-center items-center gap-16">
            <label className="text-white text-nowrap text-md font-medium">
              Email
            </label>
            <input type="email" placeholder="Enter your email address" { ...register('email',{required:true}) }
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div> 
          {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          <div className="flex justify-center items-center gap-8">
            <label className="text-white text-md font-medium">
              Password
            </label>
            <input type="password" placeholder="Enter your password" { ...register('password',{required:true, minLength:6 }) }
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div>
          {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          <button type="submit" className="w-full flex justify-center items-center rounded-md py-2 text-white bg-[#6C47FF] hover:bg-[#5535FF]">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
        <div className="mt-2 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?
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