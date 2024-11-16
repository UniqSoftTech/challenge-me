"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  CHAIN_NAMESPACES,
  IAdapter,
  IProvider,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { chainConfig, clientId } from "../utils/chainUtils";

interface Web3AuthContextProps {
  provider: IProvider | null;
  loggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<any>;
  getWalletAddress: () => Promise<string | null>;
}

const Web3AuthContext = createContext<Web3AuthContextProps | undefined>(
  undefined,
);

const Web3AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const web3AuthOptions: Web3AuthOptions = {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider,
  };
  const web3auth = new Web3Auth(web3AuthOptions);

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

        console.log("🚀 ~ initWeb3Auth ~ web3auth:", web3auth);
        if (web3auth.connected) {
          setProvider(web3auth.provider);
          setLoggedIn(true);
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

      if (web3auth.connected) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error during Web3Auth login:", error);
    }
  };

  const logout = async () => {
    try {
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
    } catch (error) {
      console.error("Error during Web3Auth logout:", error);
    }
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.error("Web3Auth is not initialized");
      return null;
    }

    try {
      const user = await web3auth.getUserInfo();
      console.log("User Info:", user);
      return user;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  const getWalletAddress = async () => {
    if (!provider) {
      console.error("Provider not initialized");
      return null;
    }

    try {
      const accounts = await provider.request({ method: "eth_accounts" });
      return "";
    } catch (error) {
      console.error("Error fetching wallet address:", error);
      return null;
    }
  };

  return (
    <Web3AuthContext.Provider
      value={{
        provider,
        loggedIn,
        login,
        logout,
        getUserInfo,
        getWalletAddress,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error("useWeb3Auth must be used within a Web3AuthProvider");
  }
  return context;
};

export { Web3AuthProvider, useWeb3Auth };
