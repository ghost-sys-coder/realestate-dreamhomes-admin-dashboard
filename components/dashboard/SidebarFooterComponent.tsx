import React from 'react'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ChevronUp, LogOutIcon, User2 } from 'lucide-react'
import Link from 'next/link'

const SidebarFooterComponent = () => {
  return (
      <SidebarFooter>
          <SidebarMenu>
              <SidebarMenuItem>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <SidebarMenuButton>
                              <User2 /> <span>Tamale Frank</span>
                              <ChevronUp className="ml-auto transition-transform duration-200 ease-in-out" />
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="top"
                          className="w-fit min-w-62.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md">
                          <DropdownMenuItem><Link href={"/account"}>Account</Link></DropdownMenuItem>
                          <DropdownMenuItem><Link href={"/settings"}>Settings</Link></DropdownMenuItem>
                          <DropdownMenuItem className='w-full flex items-center gap-2 justify-between'>
                              <span>Logout</span>
                              <LogOutIcon />
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarFooter>
  )
}

export default SidebarFooterComponent