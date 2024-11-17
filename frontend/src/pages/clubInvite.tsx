"use client";

import Button from "@/components/data-display/Button";
import Input from "@/components/data-display/Input";
import ReusableModal from "@/components/data-display/Modal";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import useRequest from "@/hooks/useRequest";
import { useState } from "react";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [roomName, setRoomName] = useState<string | undefined>();
  const router = useRouter();
  const { execute } = useGlobalRequestStore();

  const handleRoomCreate = async () => {
    router.push("/club");
  };

  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="pb-4 flex flex-row items-center justify-between"
      >
        <ArrowLeft size={25} />
      </button>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <h1 className="text-gray-500">Invite your friends</h1>
          <Input
            label="name"
            value={"https://challenge-me.vercel.app/room/1234"}
            name="name"
            placeholder="Name..."
            onChange={(e: any) => setRoomName(e.target.value)}
          />
          <div className="flex flex-row gap-3">
            <Button
              title="Copy"
              className="bg-yellow-400"
              onPress={() => toast("Copied to clipboard")}
            />
            <Button
              className="bg-white"
              title="Share"
              onPress={() => console.log("Share")}
            />
          </div>
        </div>
        <div className="flex justify-end flex-end mt-6">
          <div>
            <Button title="Finish" onPress={() => handleRoomCreate()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
