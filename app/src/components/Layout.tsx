import React from "react";
import { usePayTC } from "../contexts/usePaytc";
import FullScreenLoader from "./FullScreenLoader";
import NavigationBar from "./NavigationBar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { fullScreenLoading } = usePayTC();

  return (
    <div className='flex flex-col items-center h-screen text-white md:px-8 lg:h-auto lg:min-h-screen bg-black-800'>
      <NavigationBar />
      <div className='relative bg-black-900 p-2 overflow-y-scroll lg:overflow-y-auto md:p-10 rounded-t-[40px] md:rounded-[40px] overflow-x-hidden  flex flex-col  items-center flex-1 w-full lg:mb-6'>
        {children}
      </div>
      {fullScreenLoading && <FullScreenLoader />}
    </div>
  );
}

export default Layout;
