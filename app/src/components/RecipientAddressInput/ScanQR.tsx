import React from "react";

const ScanQR = () => {
  return (
    <div className='flex flex-col justify-between align-middle'>
      <div className='flex  w-full flex-row justify-between items-center mb-40 text-gray-50 z-10'>
        {/* <Link href="/">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 p-2 cursor-pointer hover:bg-gray-500 text-gray-50 rounded-full mr-3" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                    </Link> */}
        {/* <div className="flex flex-row items-center ">
                    <span className="text-sm">QR Code</span>
                </div> */}
      </div>
      <div className='bg-black-900 opacity-60 inset-0 '></div>
      <div className='text-center z-10'>
        <div className=''>
          <div className='relative border-corner p-5 m-auto  rounded-xl bg-cover w-48 h-48 flex '>
            <div className='flex'>
              <span className='border_bottom'></span>
            </div>
          </div>
        </div>
        <p className='text-gray-300 text-xs mt-3'>Scan a QR Code</p>
      </div>
    </div>
  );
};

export default ScanQR;
