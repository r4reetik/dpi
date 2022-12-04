import React, { useEffect, useState } from "react";
import { UilUserCircle } from "@iconscout/react-unicons";
import { getEnsOrAddress } from "../utils/ens";
import Image from "next/image";
// import Logo from "public/svgs/white-logo-without-slogan.svg";
import Logo from "public/images/white-without-slogan.png"
import { useWeb3React } from "@web3-react/core";

const NavigationBar = () => {
  const { account } = useWeb3React();
  const [ens, setEns] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (account) {
        const _ens = await getEnsOrAddress(account);
        setEns(_ens);
      }
    })();
    return () => {};
  }, [account]);

  return (
    <nav className='w-full'>
      <div className='relative grid items-center grid-cols-2 lg:grid-cols-[0.5fr_1fr_0.5fr] lg:px-12'>
        <div className='py-4 xs:px-0 xs:py-6'>
            <Image src={Logo} alt="logo" width={64} height={32} />
            {/* <Logo className="w-8 h-8"/> */}
        </div>
        <div className='flex items-center justify-center'>
          <div className='relative inline-block text-left '>
            <div className='flex items-center gap-2 px-3 py-2 text-lg font-semibold rounded-lg hover:bg-black-600 min-w-[190px] justify-center relative'>
              <span>{!account ? "Connect" : ens ?? account.substring(0, 8)}</span>
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
