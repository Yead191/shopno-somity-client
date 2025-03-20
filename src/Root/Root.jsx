import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Navbar from '@/shared/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';


const Root = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <SidebarProvider>
                <nav className='h-[64px] '>
                    <Navbar SidebarTrigger={SidebarTrigger} />
                </nav>
                
                <AppSidebar />
                <main className="px-4 flex-1">

                    <Outlet />
                </main>
            </SidebarProvider>
            <footer>

            </footer>

        </div>
    );
};

export default Root;