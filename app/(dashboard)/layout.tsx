import React from 'react'
import { redirect } from 'next/navigation'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/dashboard/AppSidebar'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

import { db } from '@/db/drizzle'
import { usersTable } from '@/db/schema'
import { checkRole } from '@/utils/roles'



const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const clerkUser = await currentUser();

  if(clerkUser) {
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.id, clerkUser.id)).limit(1);

    if (existingUser.length === 0) {
      // create if missing -- fallback to the webhook
      await db.insert(usersTable).values({
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        imageUrl: clerkUser.imageUrl || "",
        role: "client"
      })
    }
  }

  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-20'>
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