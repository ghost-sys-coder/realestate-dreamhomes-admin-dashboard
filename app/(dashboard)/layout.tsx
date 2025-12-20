import React from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/dashboard/AppSidebar'
import { UserButton } from '@clerk/nextjs'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='md:hidden' />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">DreamHomes Properties</h1>
            <div className="flex items-center gap-2">
              <UserButton />
            </div>
          </div>
        </header>
        <main className='flex-1 overflow-auto p-4 md:p-6'>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout