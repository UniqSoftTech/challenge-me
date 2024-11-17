"use client";

import Button from "@/components/data-display/Button";
import Input from "@/components/data-display/Input";
import ReusableModal from "@/components/data-display/Modal";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import useRequest from "@/hooks/useRequest";
import { useEffect, useState } from "react";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { useRouter } from "next/router";
import ethersRPC from "@/utils/ethersRPC";
import WalletAvatar from "@/components/data-display/ProfilePic";

function App() {
  const router = useRouter();
  const { provider, web3Auth } = useWeb3Auth();
  console.log("🚀 ~ App ~ web3Auth:", web3Auth);
  console.log("🚀 ~ App ~ provider:", provider);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    getWalletAddress();
  }, []);

  const getWalletAddress = async () => {
    const accounts = await getAccounts();
    console.log("🚀 ~ getAccounts ~ accounts:", accounts);
    setWalletAddress(accounts);
  };

  const getAccounts = async () => {
    if (!provider) {
      return;
    }
    const address = await ethersRPC.getAccounts(provider);
    return address;
  };

  const logout = async () => {
    await web3Auth?.logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen p-4 flex flex-col gap-6">
      <h1 className="text-xl">My Profile</h1>
      <Button title="Logout" className="bg-white" onPress={() => logout()} />
    </div>
  );
}

export default App;
