import React from 'react'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { ChevronUp, LogOutIcon, User2 } from 'lucide-react'

import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { SignOutButton } from '@clerk/nextjs'

const SidebarFooterComponent = async () => {
    const clerkUser = await currentUser();
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <User2 /> <span>{clerkUser?.firstName} {clerkUser?.lastName}</span>
                                <ChevronUp className="ml-auto transition-transform duration-200 ease-in-out" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top"
                            className="w-fit min-w-62.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md">
                            <DropdownMenuItem><Link href={"/account"}>Account</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href={"/settings"}>Settings</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild className='w-full flex items-center gap-2 justify-between'>
                                <SignOutButton>
                                    <span className="flex justify-center items-center gap-1">
                                        <span>Logout</span>
                                        <LogOutIcon />
                                    </span>
                                </SignOutButton>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

export default SidebarFooterComponent