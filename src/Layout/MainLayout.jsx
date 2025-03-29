import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Navbar from '@/shared/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';


const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
                <nav className='h-[64px] '>
                    <Navbar SidebarTrigger={SidebarTrigger} />
                </nav>
                
                <main className="px-4 flex-1">

                    <Outlet />
                </main>
            
            <footer>

            </footer>

        </div>
    );
};

export default MainLayout;