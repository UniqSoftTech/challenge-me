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
  const router = useRouter();

  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="pb-4 flex flex-row items-center justify-between"
      >
        <ArrowLeft size={25} />
      </button>

      <div className="flex flex-col gap-3">
        <h1>Choose emoji</h1>
        <div className="flex">
          <button className="bg-gray-200 p-3 rounded-full">
            <Plus />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h1>I can...</h1>
          <Input
            value={""}
            label="Title"
            name="title"
            onChange={() => console.log("cons")}
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1>Suggessted Challenges</h1>
          <div className="flex flex-row items-center gap-3">
            <h1 className="py-1 px-2 rounded-full bg-gray-200">💪</h1>
            <h1 className="font-bold">Losing 5kg in 30 days.</h1>
          </div>
          <div className="flex flex-row items-center gap-3">
            <h1 className="py-1 px-2 rounded-full bg-gray-200">🏃‍♀️</h1>
            <h1 className="font-bold">Running 3km everyday for a week.</h1>
          </div>
          <div className="flex flex-row items-center gap-3">
            <h1 className="py-1 px-2 rounded-full bg-gray-200">⏰</h1>
            <h1 className="font-bold">Waking up before 7AM for a month.</h1>
          </div>
        </div>
        <div className="flex justify-end flex-end">
          <div>
            <Button title="Next" onPress={() => console.log("gg")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
