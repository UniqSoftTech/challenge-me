"use client";

import Button from "@/components/data-display/Button";
import Input from "@/components/data-display/Input";
import ReusableModal from "@/components/data-display/Modal";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import useRequest from "@/hooks/useRequest";
import Shape from "../assets/shape.svg";
import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import Image from "next/image";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="pb-4 flex flex-row items-center justify-between">
        <h1 className="text-xl">My Clubs</h1>
        <button
          onClick={() => router.push("/createChallenge")}
          className="flex flex-row items-center gap-1 bg-[#FFD700] px-4 py-1 rounded-2xl border border-black shadow-[3px_3px_0px_#94a3b8]"
        >
          <Plus />
          <h1>Create</h1>
        </button>
      </div>
      <div className="flex flex-col relative overflow-hidden gap-2 p-5 border-2 border-black bg-primary rounded-2xl shadow-[3px_3px_0px_#94a3b8]">
        <div className="absolute right-[-45%] bottom-[-40%]">
          <Image src={Shape} alt="Shape" />
        </div>
        <h1 className="text-lg z-10 font-bold">Gainers Club</h1>
        <div className="flex flex-row gap-3 text-sm">
          <p>8 Challenges</p>
          <p>6 Members</p>
        </div>
      </div>
    </div>
  );
}

export default App;
