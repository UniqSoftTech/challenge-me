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

  const { loading, data, trigger } = useRequest({
    key: "userRooms",
    url: "user-rooms",
  });

  const handleRoomCreate = async () => {
    console.log("roomname", roomName);
    await execute(
      "room",
      { method: "POST", url: "room" },
      {
        data: { name: roomName },
        onSuccess: (data) => console.log("data", data),
        onError: (error) => console.log("error", error),
      },
    );
    // setIsOpen(false);
  };

  const onClose = () => setIsOpen(false);
  const [roomName, setRoomName] = useState("");

  return (
    <div className="min-h-screen p-4 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Hello World
      </h1>
      <Button title="Create Club" onPress={() => console.log("create room")} />
      <h1>Room List</h1>
      <div>Room 1</div>
      <ReusableModal
        size={"sm"}
        isOpen={isOpen}
        onClose={onClose}
        title="Create Room"
        body={
          <div>
            <Input
              label="Name"
              placeholder="Enter your name"
              name={""}
              value={roomName}
              onChange={(e: any) => setRoomName(e.target.value)}
            />
          </div>
        }
        footer={
          <>
            <Button title="Save" onPress={handleRoomCreate} />
          </>
        }
      />
    </div>
  );
}

export default App;
