declare enum Chain {
    Ethereum = "Ethereum",
    Polygon = "Polygon",
  }
  
  export const colors: { [chain in Chain]: string } = {
    [Chain.Ethereum]: "bg-[#3B74F7]",
    [Chain.Polygon] : "bg-[#8c44f8]"
  };
  