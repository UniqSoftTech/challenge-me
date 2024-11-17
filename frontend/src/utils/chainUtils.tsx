import { CHAIN_NAMESPACES } from "@web3auth/base";

export const clientId =
  "BL-UfOVx5rVplTrquz_wlU4kO2ijt5mN8W2SOMWi17NXQivpHzDF5YFzw2TCn2WjvpA1HenhDs4Ct3GSc83UieI";

export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x14A34",
  rpcTarget: "https://sepolia.base.org",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia-explorer.base.org",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};
