import React, { useEffect, useState } from "react";
import { UilUserCircle } from "@iconscout/react-unicons";

const NavigationBar = () => {
  return (
    <nav className='w-full'>
      <div className='relative grid items-center grid-cols-2 lg:grid-cols-[0.5fr_1fr_0.5fr] lg:px-12'>
        <div className='px-3 py-4 xs:px-0 xs:py-6'>L O G O</div>
        <div className='flex items-center justify-end'>
          <div className='relative inline-block text-left '>
            <div className='flex items-center gap-2 px-3 py-2 text-lg font-semibold rounded-lg hover:bg-black-600  min-w-[190px] justify-center relative'>
              <span>displayName</span>
              <span className='relative'>
                <UilUserCircle />
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
