import React from 'react'
import Link from 'next/link'
import RandomImageClient from '@/components/shared/RandomImage.client'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="min-h-screen relative">
      {/* Task: make the image fixed - no scrolling */}
      <div className="hidden lg:block fixed inset-0 left-0 w-1/2">
        <div className="relative w-full h-full overflow-hidden">
          <RandomImageClient />
          <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for text */}
          <div className="relative z-10 bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">DreamHomes Properties</h1>
            <p className="text-xl opacity-90">Uganda&apos;s Premier Real Estate Firm</p>
            <p className="mt-4 max-w-md">
              Managing exceptional residential and commercial properties across Kampala, Kololo, Naguru, and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Right Auth form Section */}
      <div className="relative lg:ml-[50%] min-h-screen flex flex-col bg-background">
        <div className="absolute inset-0 lg:hidden">
          <RandomImageClient />
        </div>
        <header className='sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b px-10 px-8 text-center'>
          <Link href="/" className='inline-block py-4'>
            <h2 className='text-3xl font-bold text-foreground'>DreamHomes Properties</h2>
            <p className='text-muted-foreground text-sm mt-2'>Admin Portal</p>
          </Link>
        </header>
        <div className="flex flex-1 justify-center items-center p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  )
}

export default AuthLayout