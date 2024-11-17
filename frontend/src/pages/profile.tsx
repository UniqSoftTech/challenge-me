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
    <div className="min-h-screen p-4 pb-16 flex flex-col gap-6">
      <h1 className="text-xl">My Profile</h1>
      <div className="border px-4 py-3 rounded-xl">
        <h2 className="text-sm">Name</h2>
        <h2 className="font-semibold">Jay</h2>
      </div>
      <div className="border px-4 py-3 rounded-xl">
        <h2 className="text-sm">Birthdate</h2>
        <h2 className="font-semibold">1997/11/10</h2>
      </div>
      <div className="border px-4 py-3 rounded-xl">
        <h2 className="text-sm">Pronoun</h2>
        <h2 className="font-semibold">He/him</h2>
      </div>

      <div className="border px-4 py-3 rounded-xl">
        <h2 className="text-sm">Height</h2>
        <h2 className="font-semibold">183</h2>
      </div>

      <div className="border px-4 py-3 rounded-xl">
        <h2 className="text-sm">Weight</h2>
        <h2 className="font-semibold">93 kg</h2>
      </div>

      <div className="border px-4 py-3 rounded-xl">
        <h2 className="text-sm">Relationship Status</h2>
        <h2 className="font-semibold">In a relationship</h2>
      </div>
      <Button title="Logout" className="bg-white" onPress={() => logout()} />
    </div>
  );
}

export default App;
