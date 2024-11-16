import { CHAIN_NAMESPACES } from "@web3auth/base";

export const clientId =
  "BPX4ykTOMg5RaG5B5rdckeHMLqQQtT72TeJ3vgXfNZbuP3Lec6a3DFwJLZWul0HI9gv26yrEZr0e_aq5QxvHlOY";

export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};
