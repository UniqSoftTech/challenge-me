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
    console.log("🚀 ~ login ~ web3authProvider:", web3authProvider);
    setProvider(web3authProvider);
    console.log("🚀 ~ login ~ web3auth:", web3auth);

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
              router.push("/app");
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
    <div className="flex flex-col min-h-screen bg-[#00D084] text-black">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="text-black text-sm font-bold">12:45</div>
        <div className="flex gap-2 items-center">
          <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
        </div>
      </div>

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

        {/* Background shape */}
        <div className="absolute top-20 -z-10 w-[300px] h-[300px] bg-[#FFC107] rounded-[50%] clip-path-custom" />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center px-4 pb-8">
        <button
          onClick={login}
          className="px-8 w-full py-4 bg-black text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition"
        >
          Connect Your Wallet
        </button>
      </div>
    </div>
  );
}

export default App;
