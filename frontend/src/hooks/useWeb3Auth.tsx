"use client";

import { useState, useEffect } from "react";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { IAdapter, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import ethersRPC from "@/utils/ethersRPC";
import { chainConfig, clientId } from "@/utils/chainUtils";

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId: clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
};

const web3auth = new Web3Auth(web3AuthOptions);

export const useWeb3Auth = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        });
        await web3auth.initModal();

        if (web3auth.connected) {
          const web3authProvider = web3auth.provider;
          setProvider(web3authProvider);
          // const address = await ethersRPC.getAccounts(web3authProvider);
          // setWalletAddress(address);
        }
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      }
    };

    initWeb3Auth();
  }, []);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      console.log("🚀 ~ login ~ web3authProvider:", web3authProvider);

      // const address = await ethersRPC.getAccounts(web3authProvider);
      // setWalletAddress(address);

      return ""; // Return wallet address after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await web3auth.logout();
      setProvider(null);
      setWalletAddress(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getAccounts = async () => {
    if (!provider) return null;

    try {
      const address = await ethersRPC.getAccounts(provider);
      setWalletAddress(address);
      return address;
    } catch (error) {
      console.error("Failed to get accounts:", error);
      return null;
    }
  };

  return {
    login,
    logout,
    getAccounts,
    walletAddress,
    provider,
  };
};
