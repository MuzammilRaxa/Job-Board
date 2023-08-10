'use client'
import { useAuthContext } from '@/contexts/AuthProvider'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const { user, authStatus, logout } = useAuthContext()
  console.log('user->',user)
  console.log('authStatususer->',authStatus)
  return (
    <div className="flex h-20 justify-between bg-[#292D51] px-10">
      <div className="flex flex-1 items-center justify-start">
        <Link href={'/'} className="rounded-lg bg-[#D9D9D9] px-2 py-1">
          {/* Website&apos;s Logo */}
          <Image alt="Logo" src="/images/Logo.png" height={50} width={160} />
        </Link>
      </div>

      <div className="flex max-w-lg flex-[2] items-center justify-around space-x-16 text-white">
        <Link href={'/job-board'} className="">
          Jobs Board
        </Link>
        <Link href={'/create-job'} className="">
          Create Job
        </Link>
        <Link href={'/pricing'} className="">
          Search
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end">
        {authStatus === 'authenticated' ? (
          <>
            <p className="mr-4 rounded-full p-1 px-3 text-yellow-50 shadow shadow-purple-800 duration-300 ease-in-out hover:cursor-pointer hover:py-2">
              <Link href={'#'}>{user?.name}</Link>
            </p>
            <button
              className="rounded-full bg-blue-400 px-6 py-2"
              onClick={() => logout()}
            >
              Logout
            </button>
          </>
        ) : authStatus === 'unauthenticated' ? (
          <Link href={'/login'} className="rounded-full bg-blue-400 px-6 py-2">
            Login
          </Link>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </div>
  )
}

export default Navbar
