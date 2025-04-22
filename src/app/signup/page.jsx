'use client'

import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux'
import {registerUser} from '../../store/slices/authSlice.js'
import { useRouter } from 'next/navigation.js'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

function CreateAccount() {
  const { handleSubmit, register, setValue, watch, formState:{ errors } } = useForm()
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.auth?.loading)
  const router = useRouter()

  const avatar = watch('avatar');
  const coverImage = watch('coverImage');

  const submit = async (data) => {
    const result = await dispatch(registerUser(data))
    if(result) router.replace('/')
    return
  }

  if(loading) return <>Loading...</>
  return (
    <div className="container scale-75 sm:scale-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Sign up to start creating and sharing videos</CardDescription>
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

            <div className='flex gap-5 py-5'>
              <div>
                <div className="space-y-1">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-input bg-background">
                      {avatar ? (
                        <img
                          src={URL.createObjectURL(avatar) || "/placeholder.svg"}
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setValue('avatar',e.target.files[0])}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <div className="flex flex-col gap-4">
                    <div className="relative w-full h-28 rounded-md overflow-hidden border border-input bg-background">
                      {coverImage ? (
                        <img
                          src={URL.createObjectURL(coverImage) || "/placeholder.svg"}
                          alt="Cover image preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <Input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setValue('coverImage', e.target.files[0])}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-1 mb-4">
                <Label htmlFor="fullname">Full Name</Label>
                <Input 
                  id="fullname"
                  placeholder="Enter your fullname" 
                  { ...register('fullname',{required:true}) }
                />
                </div>

                <div className="space-y-1 mb-4">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username" 
                  { ...register('username',{required:true}) }
                />
                </div>

                <div className="space-y-1 mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  { ...register('email',{required:true}) }
                />
                </div>

                <div className="space-y-1 mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  { ...register('password',{required:true, minLength:6 }) }
                />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary text-blue-600 underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
export default CreateAccount