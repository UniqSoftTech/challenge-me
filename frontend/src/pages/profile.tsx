"use client";

import Button from "@/components/data-display/Button";
import Input from "@/components/data-display/Input";
import ReusableModal from "@/components/data-display/Modal";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import useRequest from "@/hooks/useRequest";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const { execute } = useGlobalRequestStore();

  const onClose = () => setIsOpen(false);
  const [roomName, setRoomName] = useState("");

  return (
    <div className="min-h-screen p-4 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Hello World
      </h1>
    </div>
  );
}

export default App;
