import React, { useState } from "react";

function Input({ resolve }: { resolve: (text: string) => void }) {
  const [input, setInput] = useState("");
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => resolve(input)}>submit</button>
    </div>
  );
}

export default Input;
