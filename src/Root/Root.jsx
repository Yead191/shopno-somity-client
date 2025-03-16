import Navbar from '@/shared/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <nav className='h-[64px] '>
                <Navbar></Navbar>
            </nav>
            <main className='flex-grow'>
                <Outlet></Outlet>

            </main>
            <footer>

            </footer>

        </div>
    );
};

export default Root;