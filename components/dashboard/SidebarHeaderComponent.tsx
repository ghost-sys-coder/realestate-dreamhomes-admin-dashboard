import React from 'react'
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const SidebarHeaderComponent = () => {
  return (
      <SidebarHeader>
          <SidebarMenu>
              <SidebarMenuItem>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <SidebarMenuButton tooltip="Settings" className='w-full justify-between'>
                              Vaal Properties
                              <ChevronDown className='mt-auto' />
                          </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-fit min-w-62.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md'>
                          <DropdownMenuItem className='w-full block'>
                              <Link href='/'>Visit Client</Link>
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </SidebarMenuItem>
          </SidebarMenu>      
    </SidebarHeader>
  )
}

export default SidebarHeaderComponent