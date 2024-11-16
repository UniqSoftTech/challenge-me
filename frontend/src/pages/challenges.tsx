"use client";

import Button from "@/components/data-display/Button";
import Input from "@/components/data-display/Input";
import ReusableModal from "@/components/data-display/Modal";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import useRequest from "@/hooks/useRequest";
import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { useRouter } from "next/router";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="pb-4 flex flex-row items-center justify-between">
        <h1 className="text-xl">My Challenges</h1>
        <button
          onClick={() => router.push("/createChallenge")}
          className="flex flex-row items-center gap-1 bg-[#FFD700] px-4 py-1 rounded-2xl border border-black shadow-[3px_3px_0px_#94a3b8]"
        >
          <Plus />
          <h1>Create</h1>
        </button>
      </div>
      <div className="flex flex-col gap-4 p-4 border rounded-2xl shadow-[3px_3px_0px_#94a3b8]">
        <div className="flex flex-row justify-between border-b pb-2">
          <h1 className="text-sm font-bold">Djon Zena</h1>
          <p className="text-sm">10 day remaining</p>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <div className="bg-gray-200 px-2 py-1 rounded-full">
            <h1>💪</h1>
          </div>
          <div className="text-lg font-semibold">Losing 10kg a Day</div>
        </div>
        <div>
          <div className="flex w-full items-center">
            <div className="h-1 bg-green-400" style={{ width: "28%" }}></div>
            <div className="h-1 bg-red-400" style={{ width: "72%" }}></div>
          </div>
          <div className="flex w-full justify-between mt-2">
            <h2 className="text-green-400">28%</h2>
            <h2 className="text-red-400">72%</h2>
          </div>
        </div>
        <div className="text-sm">13 Votes</div>
        <div className="px-3 py-3 border rounded-xl flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-black" />
            <h1 className="text-sm text-gray-500">
              <span className="font-bold text-black">Jane Doe</span>{" "}
              <span>voted</span>
              &nbsp;<span className="font-semibold text-green-500">Yes</span> at
              4.99 USDT
            </h1>
          </div>
          <p>Nah, you tripping bro. All in on Nope</p>
          <p className="text-sm text-right text-gray-400">1hr ago</p>
        </div>
      </div>
    </div>
  );
}

export default App;
