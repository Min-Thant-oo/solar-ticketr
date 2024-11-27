import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <div className='border-b'>
        <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
            <div className="flex items-center justify-between w-full lg:w-auto">
                <Link 
                    href="/"
                    className='text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0'
                    >
                    Solar Ticketr
                </Link>

                {/* mobile view */}
                <div className="lg:hidden">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode='modal'>
                            <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>

            {/* Search Bar - Full width on mobile */}
            <div className="flex-1 w-full">
                <SearchBar />
            </div>

            {/* Desktop view */}
            <div className="hidden lg:block ml-auto">
                <SignedIn>
                    <div className="flex items-center gap-3">
                        <Link href='/seller'>
                            <button className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-700 transition">
                                Sell Tickets
                            </button>
                        </Link>

                        <Link href='/tickets'>
                            <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                                My Tickets
                            </button>
                        </Link>

                        <UserButton />

                    </div>
                </SignedIn>

                <SignedOut>
                    <SignInButton mode='modal'>
                        <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                            Sign In 
                        </button>
                    </SignInButton>
                </SignedOut>
            </div>

            {/* Mobile */}
            <div className="lg:hidden w-full flex justify-center gap-3">
                <SignedIn>
                    <Link href='/seller' className='flex-1'>
                        <button className='w-full bg-blue-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-700 transition'>
                            Sell Tickets
                        </button>
                    </Link>

                    <Link href='tickets' className='flex-1'>
                        <button className="w-full bg-gray-100 text-gray-800 px-3 py-1 5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                            My Tickets
                        </button>
                    </Link>
                </SignedIn>
            </div>
        </div>
    </div>
        
  )
}

export default Header