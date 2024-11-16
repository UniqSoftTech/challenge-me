"use client";

import { IAdapter, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { useEffect, useState } from "react";
import { chainConfig, clientId } from "../utils/chainUtils";
import ethersRPC from "@/utils/ethersRPC";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import Image from "next/image";
import Art from "../assets/art.svg";

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
  const { requests, execute } = useGlobalRequestStore();

  const { walletAddress, setWalletAddress } = useAuth();
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true); // Set loading to true while initializing
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        });
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          // Optional: Perform post-login actions here
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after initialization
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);

    if (web3auth.connected) {
      const address = await getAccounts();

      await execute(
        "login",
        { method: "POST", url: "user/signin" },
        {
          data: { wallet: address },
          onSuccess: async (result) => {
            if (result.status === 200) {
              await localStorage.setItem("token", result?.data?.data?.token);
              router.push("/club");
            } else {
              router.push("/verification");
            }
          },
          onError: (error) => router.push("/verification"),
        },
      );
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      return;
    }
    const address = await ethersRPC.getAccounts(provider);
    return address;
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#00D084] text-black">
      <div className="flex flex-col justify-center flex-grow relative gap-12">
        <h1 className="text-4xl font-extrabold px-6 text-black">
          Challenge
          <span className="text-white">Me</span>
        </h1>

        {/* Image */}
        <div className="top-32">
          <Image
            src={Art}
            alt="Art"
            width={300}
            height={300}
            className="z-10"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center px-4 pb-8">
        <button
          onClick={login}
          className={`px-8 w-full py-4 text-xl font-semibold rounded-lg shadow-lg transition ${
            isLoading
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Loading..." : "Connect Your Wallet"}
        </button>
      </div>
    </div>
  );
}

export default App;
