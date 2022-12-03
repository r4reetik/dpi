import React from "react";
import Input from "./Input";
import ScanQR from "./ScanQR";

function RecipientAddressInput() {
  const resolve = async (text: string) => {};

  return (
    <div>
      <ScanQR />
      <Input />
    </div>
  );
}

export default RecipientAddressInput;
