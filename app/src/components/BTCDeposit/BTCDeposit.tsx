import { useState } from "react";
import { useGateway } from "../../hooks/useGateway";
import BottomSheet from "../BottomSheets/BottomSheet";
import ContentWrapper from "../wrappers/ContentWrapper";

export const BTCDeposit = ({ onBack }: { onBack: () => void }) => {
  const [showStatus, setShowStatus] = useState(false);
  const _cb = (status: string, hash?: string) => {
    if (status === "tx3_done") {
      setShowStatus(true);
    }
  };
  const gatewayAddress = useGateway(_cb);

  return (
    <div className='flex flex-col h-full'>
      <span className='text p-3 mt-5'>
        Deposit BTC into the the below address to get BTC on your smart wallet
      </span>
      {gatewayAddress && (
        <ContentWrapper label='Address'>
          <div className='flex flex-col justify-items-center '>
            <span className='text-center font-bold'> {gatewayAddress} </span>
            <button
              className='text-center border-primary border-[1px] px-2 py-1 ml-auto mr-2 w-min mt-2'
              onClick={() => navigator.clipboard.writeText(gatewayAddress)}>
              {"Copy"}
            </button>
            <div className='h-10'></div>
            <span className='p-2'>Please be on this page while we process your deposit.</span>
          </div>
        </ContentWrapper>
      )}
      {gatewayAddress === null && <span className='text-center'>Loading...</span>}

      {showStatus && (
        <BottomSheet title='Success' open setOpen={setShowStatus}>
          <div className='px-2 py-4'>
            Transaction was successful. Please go back and check your funds
          </div>
        </BottomSheet>
      )}
    </div>
  );
};
