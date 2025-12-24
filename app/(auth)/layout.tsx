import React from 'react'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'

import RandomImageClient from '@/components/shared/RandomImage.client'
import { Button } from '@/components/ui/button'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const clerkUser = await currentUser();

  if (clerkUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-10 text-center border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3">
              You&apos;re Already Logged In
            </h1>

            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              Welcome back! You already have an active session.
            </p>

            <Button asChild size="lg" className="w-full max-w-xs">
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </Button>

            <p className="mt-6 text-sm text-muted-foreground">
              Or <Link href="/" className="text-primary hover:underline font-medium">return to homepage</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

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