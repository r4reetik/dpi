import React, { useState } from "react";

function Input({ resolve }: { resolve: (text: string) => void }) {
  const [input, setInput] = useState("");
  return (
    <div className="flex justify-between gap-2"  >
      <input className='peer text-left md:text-right w-full border-r-none border-t-none border-l-none border-b-2 outline-none select-none font-[inherit] text-md bg-inherit font-bold hide-arrows' placeholder="Enter reciever address" value={input} onChange={(e) => setInput(e.target.value)} />
      <button className="bg-primary p-4 rounded-xl" onClick={() => resolve(input)}>Submit</button>
    </div>
  );
}

export default Input;
