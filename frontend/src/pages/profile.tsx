"use client";

import Button from "@/components/data-display/Button";
import Input from "@/components/data-display/Input";
import ReusableModal from "@/components/data-display/Modal";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import useRequest from "@/hooks/useRequest";
import { useState } from "react";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();
  const { provider, web3Auth } = useWeb3Auth();

  const logout = async () => {
    await web3Auth?.logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Hello World
      </h1>

      <Button title="Logout" className="bg-red-400" onPress={() => logout()} />
    </div>
  );
}

export default App;
