import React from "react";
import { ChainIdToNetwork } from "../../constants/ChainIdNetwork";
import BottomSheet from "./BottomSheet";

type DefaultChainIdBottomSheetType = {
  onSelect: (chainId: number) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DefaultChainIdBottomSheet({ onSelect, ...rest }: DefaultChainIdBottomSheetType) {
  return (
    <BottomSheet {...rest}>
      <BottomSheet.Title>Select Chain</BottomSheet.Title>
      <BottomSheet.Separator />
      <div></div>
    </BottomSheet>
  );
}

export default DefaultChainIdBottomSheet;
