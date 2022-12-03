import React from "react";
import { UilSpinner } from "@iconscout/react-unicons";

function FullScreenLoader() {
  return (
    <div className='absolute bg-black-900 opacity-70 w-full h-full z-10 flex items-center justify-center'>
      <div className='animate-spin'>
        <UilSpinner />
      </div>
    </div>
  );
}

export default FullScreenLoader;
