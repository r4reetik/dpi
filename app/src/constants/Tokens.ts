export type TokenType = {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  priceUSD: number;
  image: string;
  chain: string;
  domainId: string;
  balance?: string;
};

export const Tokens: { [x: string]: TokenType } = {
  "0xeDb95D8037f769B72AAab41deeC92903A98C9E16": {
    symbol: "TEST",
    chain: "Polygon",
    chainId: 80001,
    image:
      "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png",
    domainId: "9991",
    address: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
    decimals: 18,
    priceUSD: 0.924,
  },
  "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9": {
    symbol: "WETH",
    chain: "Polygon",
    chainId: 80001,
    image: "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    domainId: "9991",
    address: "0xFD2AB41e083c75085807c4A65C0A14FDD93d55A9",
    decimals: 18,
    priceUSD: 1271.43,
  },
  ["0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1".toUpperCase()]: {
    symbol: "TEST",
    chain: "Ethereum",
    chainId: 5,
    image:
      "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png",
    domainId: "1735353714",
    address: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
    priceUSD: 0.924,
    decimals: 18,
  },
  ["0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6".toUpperCase()]: {
    symbol: "WETH",
    chain: "Ethereum",
    chainId: 5,
    image: "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    domainId: "1735353714",
    address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    decimals: 18,
    priceUSD: 1271.43,
  },
};
