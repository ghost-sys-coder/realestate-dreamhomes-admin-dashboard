import React from 'react'
import { Building2, FileText, Home, MessageSquare, Settings, Users2 } from 'lucide-react'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import Link from 'next/link'

const menuItems = [
    { title: "Overview", icon: Home, href: "/dashboard" },
    { title: "Properties", icon: Building2, href: "/dashboard/properties" },
    { title: "Agents", icon: Users2, href: "/dashboard/agents" },
    { title: "Inquiries", icon: MessageSquare, href: "/dashboard/inquiries" },
    { title: "Reports", icon: FileText, href: "/dashboard/reports" },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" }
]

const SidebarGroupComponent = () => {
  return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>DreamHomes Properties</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='mt-3 min-h-[calc(75vh-8rem)] flex flex-col justify-between'>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} className='hover:translate-x-2 transition-all flex items-center'>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default SidebarGroupComponent