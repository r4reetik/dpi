import React, { useState } from "react";
// @ts-ignore
import QrReader from "react-qr-scanner";

const ScanQR = ({ resolve }: { resolve: (text: string) => void }) => {
  const [input, setInput] = useState();

  const onScan = (r: any) => {
    if (!r) return;
    setInput(r.text);
  };

  return (
    <div className='flex flex-col justify-between align-middle'>
      <div className='z-10 flex flex-col items-center justify-between w-full mb-40 text-gray-50'>
        <QrReader className="rounded-2xl -scale-x-100" delay={500} onScan={onScan} onError={() => console.error("QR failed to load")} />
        <p className='mt-3 text-xs text-gray-300'>Scan a QR Code</p>
        {input && (
          <>
            <p className='mt-2'> {input} </p> <button className="bg-primary px-4 py-2 rounded-lg" onClick={() => resolve(input)}>submit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
