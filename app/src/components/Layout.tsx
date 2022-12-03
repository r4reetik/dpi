import React from 'react';
import BottomSheet from './BottomSheet';
import NavigationBar from './NavigationBar';

interface LayoutProps {
    children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div className='flex flex-col items-center h-screen text-white md:px-8 lg:h-auto lg:min-h-screen bg-black-800'>
            <NavigationBar/>
            <div className='relative bg-black-900 p-2 overflow-y-scroll coingrid-scrollbar lg:overflow-y-auto md:p-10 rounded-t-[40px] md:rounded-[40px] overflow-x-hidden  flex flex-col  items-center flex-1 w-full lg:mb-6'>
                {children}
            </div>
        </div>
    );
}

export default Layout;