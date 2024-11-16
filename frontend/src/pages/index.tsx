"use client";

import { IAdapter, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { useEffect, useState } from "react";
import { chainConfig, clientId } from "../utils/chainUtils";
import ethersRPC from "@/utils/ethersRPC";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { useAuth } from "@/context/authContext";
import Button from "@/components/data-display/Button";
import { useRouter } from "next/router";

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};
const web3auth = new Web3Auth(web3AuthOptions);

function App() {
  const router = useRouter();
  const { walletAddress, setWalletAddress } = useAuth();
  const [provider, setProvider] = useState<IProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        });
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          // setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      getAccounts();
    }

    router.push("/verification");
  };

  const getAccounts = async () => {
    if (!provider) {
      return;
    }
    const address = await ethersRPC.getAccounts(provider);
    setWalletAddress(address);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    // setLoggedIn(false);
  };

  const handleWorldCoinVerify = (proof: any) => {
    console.log("🚀 ~ handleWorldCoinVerify ~ proof:", proof);
    // router.push("/verification");
  };

  const unloggedInView = (
    <button
      onClick={login}
      className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 active:scale-95 focus:outline-none"
    >
      Login with Web3Auth
    </button>
  );

  return (
    <div className="flex flex-col">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Hello World
        </h1>
        <p className="text-lg text-gray-400">Web 3 auth</p>
      </header>

      <main className="flex flex-col items-center mt-8">
        <div className="flex flex-col items-center justify-center gap-6">
          {unloggedInView}
        </div>
      </main>
    </div>
  );
}

export default App;
