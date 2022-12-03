import React, { useEffect, useState } from "react";
import { UilUserCircle } from "@iconscout/react-unicons";
import { usePayTC } from "../contexts/usePaytc";
import { getEnsOrAddress } from "../utils/ens";
import Image from "next/image";
import Logo from "public/images/logo.png"

const NavigationBar = () => {
  // const {mmAddress} = usePayTC();
  // const [displayName,setDisplayName] = useState<string>();
  // useEffect(()=>{
  //     getENSOrAddress(mmAddress).then((res)=>{setDisplayName(res)})
  // })
  return (
    <nav className='w-full'>
      <div className='relative grid items-center grid-cols-2 lg:grid-cols-[0.5fr_1fr_0.5fr] lg:px-12'>
        <div className='flex justify-center align-middle py-4 xs:px-0 xs:py-6'>
            <Image src={Logo} alt="logo" className='w-8 h-8 xs:hidden' />
            <span className="text-3xl italic  text-primary font-extrabold">
               &nbsp;DPI
            </span>
        </div>
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
