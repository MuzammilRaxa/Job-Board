'use client'

import Apis from '@/shared/config/apis'
import ky from 'ky'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import PasswordInput from './PasswordHandler'
import { useAuthContext } from '@/contexts/AuthProvider'

const Page = () => {
  const router = useRouter()
  const { setUser } = useAuthContext()
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  const handleInputChange = (field: string, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }))
  }

  const onLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      return
    }
    console.log('loginForm-->',loginForm)
    try {
      const res: any = await ky
        .post(Apis.auth.login, {
          credentials: 'include',
          json: loginForm,
        })
        .json()
        const user =
        typeof res.user === 'string' ? res.user : JSON.stringify(res.user)
        setUser(user)
      localStorage.setItem('user', user)
      router.push('/')
      // Show success message
      console.log('You are successfully logged in!!')
    } catch (error) {
      // Handle error
      console.error('Signup error:', error)
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-[1.5] bg-[#D9D9D9]" />
      <div className="flex flex-1 items-center justify-center bg-[#211E3C] text-white">
        <div className="mx-auto max-w-xs space-y-7 xl:max-w-[420px]">
          <h1 className="mb-4 text-3xl font-bold">Login</h1>
          {/* <Link href="/login">
            <button
              className="mb-4 flex h-14 w-full items-center justify-center rounded-full bg-white px-4 py-4 text-gray-900"
              onClick={onGoogleLogin}
            >
              <Image
                height={35}
                width={35}
                alt="google icon"
                src="/images/google-icon.png"
                className="mx-5"
              />
              Sign in with Google
            </button>
          </Link> */}
          <hr className="mx-auto mb-4 w-[95%]" />
          <input
            type="email"
            className="mb-4 w-full rounded-full border border-gray-300 bg-[#6761A4] px-5 py-4 text-xl outline-none"
            placeholder="Email"
            value={loginForm.email}
            required
            onChange={(e) =>
              setLoginForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <PasswordInput
            value={loginForm.password}
            onChange={(value) => handleInputChange('password', value)}
          />
          <button
            className="button-hover active:shadow-2xld hover:text- mb-4 w-full rounded-full border border-[#6761A4] bg-transparent px-5 py-4 text-xl outline-none duration-300 ease-in-out hover:shadow-sm"
            onClick={onLogin}
          >
            Submit
          </button>
          <p className="text-[#C0C0C0]">
            New here?{' '}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Page
