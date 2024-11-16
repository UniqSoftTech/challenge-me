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
  const { walletAddress, setWalletAddress } = useAuth();
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

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
          setLoggedIn(true);
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
      setLoggedIn(true);
      getAccounts();
    }
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
    setLoggedIn(false);
  };

  const loggedInView = (
    <>
      <div className="flex-container">
        <IDKitWidget
          action={"verification"}
          onError={(error) => console.log("onError: ", error)}
          onSuccess={(response) => console.log("onSuccess: ", response)}
          handleVerify={(proof) => console.log("proof", proof)}
          app_id={"app_f33e38c15629edb15adcf97b3e3649c0"}
          verification_level={VerificationLevel.Device}
        >
          {({ open }) => <button onClick={open}>Open IDKit</button>}
        </IDKitWidget>
        <div>
          <button onClick={getAccounts} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
    </>
  );

  const unloggedInView = (
    <button
      onClick={login}
      className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 active:scale-95 focus:outline-none"
    >
      Login with Web3Auth
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Hello World
        </h1>
        <p className="text-lg text-gray-400">Web 3 auth</p>
      </header>

      <main className="flex flex-col items-center mt-8">
        <div className="flex flex-col items-center justify-center gap-6">
          {loggedIn ? loggedInView : unloggedInView}
        </div>
      </main>
    </div>
  );
}

export default App;
