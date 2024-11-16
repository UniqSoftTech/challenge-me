"use client";

import Button from "@/components/data-display/Button";
import Input from "@/components/data-display/Input";
import ReusableModal from "@/components/data-display/Modal";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import useRequest from "@/hooks/useRequest";
import { useState } from "react";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import { useRouter } from "next/router";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [roomName, setRoomName] = useState<string | undefined>();
  const router = useRouter();
  const { execute } = useGlobalRequestStore();

  const handleRoomCreate = async () => {
    await execute(
      "room",
      { method: "POST", url: "room" },
      {
        data: { name: roomName },
        onSuccess: (data) => router.push("/club"),
        onError: (error) => console.log("error", error),
      },
    );
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
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-500">Name your club</h1>
          <Input
            label="name"
            value={roomName || ""}
            name="name"
            placeholder="Name..."
            onChange={(e: any) => setRoomName(e.target.value)}
          />
        </div>
        <div className="flex justify-end flex-end">
          <div>
            <Button title="Next" onPress={() => handleRoomCreate()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
