import React, { useState } from "react";
import QrReader from "react-qr-scanner";

const ScanQR = ({ resolve }: { resolve: (text: string) => void }) => {
  const [input, setInput] = useState();

  const onScan = (r) => {
    if (!r) return;
    setInput(r.text);
  };

  return (
    <div className='flex flex-col justify-between align-middle'>
      <div className='flex w-full justify-between items-center mb-40 text-gray-50 z-10'>
        <QrReader delay={500} onScan={onScan} onError={() => console.error("QR failed to load")} />
        <p className='text-gray-300 text-xs mt-3'>Scan a QR Code</p>
        {input && (
          <>
            <p className='mt-2'> {input} </p> <button onClick={() => resolve(input)}>submit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
