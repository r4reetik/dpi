import { transactionType } from "../components/TransactionsLog/History";

export const sTransactions : transactionType[] = [
   {
      timestamp: "9:33:00",
      status: "successfully",
      type: "sent",
      value: 0.01,
      displayAddress: "0x2e88341b469967F2f35DF36D61Dc3D905c1c9201",
      token: "WETH",
      chain: "Ethereum",
      decimals: 18,
      image: "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
      amount: 12,
   },
   {
      timestamp: "9:21:00",
      status: "successfully",
      type: "sent",
      value: 0.03,
      displayAddress: "0x5D86d7055D2ED792e962a967998D05A610cdf507",
      token: "WETH",
      chain: "Polygon",
      decimals: 18,
      image: "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
      amount:0.028
   },
   {
      timestamp: "8:50:00",
      status: "successfully",
      type: "received",
      value: 0.01,
      displayAddress: "0x5D86d7055D2ED792e962a967998D05A610cdf507",
      token: "TEST",
      chain:"Ethereum",
      image: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png",
      decimals: 18,
      amount: 12
   },
   {
      timestamp: "9:47:00",
      status: "successfully",
      type: "sent",
      value: 0.02,
      chain: "Ethereum",
      displayAddress: "0xde9424BB679798b814B1E7D60b968f77840A43E0",
      token: "WETH",
      decimals: 18,
      image: "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
      amount: 24
   },
   {
      timestamp: "8:32:00",
      status: "successfully",
      type: "received",
      chain: "Ethereum",
      value: 0.02,
      displayAddress: "0x8140d94cAf0B761a1f070804EceDe511acDE6A5b",
      decimals: 18,
      token: "TEST",
      image: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png",
      amount:0.18
   },
   {
      timestamp: "8:20:00",
      status: "successfully",
      type: "sent",
      chain: "Polygon",
      value: 0.01,
      displayAddress: "0x2e88341b469967F2f35DF36D61Dc3D905c1c9201",
      token: "WETH",
      decimals: 18,
      image: "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
      amount: 0.009
   },
]