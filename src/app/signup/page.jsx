import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, ArrowRight, Eye } from 'lucide-react'
import Link from "next/link"
import { signUpAction } from "../../actions/signup.js"

function CreateAccount() {

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-inherit ">
      <div className="max-w-md space-y-5 bg-white rounded-lg p-8 shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-black">Create your account</h1>
          <p className="text-muted-foreground">Welcome! Please fill in the details to get started.</p>
        </div>
        {/* <Alert variant="destructive" className="bg-red-50 text-red-500 border-red-100">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Unable to complete action at this time. If the problem persists please contact support.
          </AlertDescription>
        </Alert> */}
        <form className="space-y-4" action={signUpAction}>
          <div className="mt-4 flex gap-[61px] items-center">
            <label htmlFor="avatar" className="text-black text-md font-medium">
              Avatar
            </label>
            <input name="avatar" id="avatar" type="file" />
          </div>
          <div className="w-full flex gap-5 items-center">
            <label htmlFor="coverImage" className="text-black text-md font-medium">
              CoverImage
            </label>
            <input name="coverImage" id="coverImage" type="file"/>
          </div>
          <div className="space-y-2">
            <label htmlFor="username" className="text-black text-md font-medium">
              Username
            </label>
            <input name="username" id="username" type="text" placeholder="Enter your username"
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div> 
          <div className="space-y-2">
            <label htmlFor="fullname" className="text-black text-md font-medium">
              Fullname
            </label>
            <input name="fullname" id="fullname" type="text" placeholder="Enter your fullname"
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div> 
          <div className="space-y-2">
            <label htmlFor="email" className="text-black text-md font-medium">
              Email address
            </label>
            <input name="email" id="email" type="email" placeholder="Enter your email address"
              className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
          </div> 
          <div className="space-y-2">
            <label htmlFor="password" className="text-black text-md font-medium">
              Password
            </label>
            <div className="relative">
              <input name="password" id="password" type="password" placeholder="Enter your password"
                className="w-full text-black p-1 px-3 rounded outline-none focus:border-black border-[1px] border-gray-400" />
            </div>
          </div>
          <button type="submit" className="w-full flex justify-center items-center rounded-md py-2 text-white bg-[#6C47FF] hover:bg-[#5535FF]">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
        <div className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#6C47FF] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default CreateAccount