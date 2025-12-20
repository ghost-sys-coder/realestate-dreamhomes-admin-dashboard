import React from 'react'
import { Sidebar, SidebarContent } from '../ui/sidebar'
import SidebarHeaderComponent from './SidebarHeaderComponent'
import SidebarFooterComponent from './SidebarFooterComponent'
import SidebarGroupComponent from './SidebarGroupComponent'

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeaderComponent />
            <SidebarContent>
                <SidebarGroupComponent />
            </SidebarContent>
            <SidebarFooterComponent />
        </Sidebar>
    )
}

export default AppSidebar