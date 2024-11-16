"use client";

import { useAuth } from "@/context/authContext";

function App() {
  const { walletAddress, setWalletAddress } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Hello World
      </h1>
    </div>
  );
}

export default App;
