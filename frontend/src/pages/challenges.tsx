"use client";

import React, { useState } from "react";
import Button from "@/components/data-display/Button";
import Input from "@/components/data-display/Input";
import Slider from "@/components/data-display/Slider";
import { Plus, Minus } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import ethersRPC from "@/utils/ethersRPC";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import Image from "next/image";
import Rocket from "../assets/rocket.gif";
import { toast } from "react-toastify";

const App = () => {
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [isShowPrice, setIsShowPrice] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [transactionInfo, setTransactionInfo] = useState<any | null>(null); // Transaction info

  const { provider } = useWeb3Auth();

  const handleBet = async (isYes: boolean) => {
    const contractAddress = "0x8c0122481be8E495e4435f1Bc652DcD16AAD6C7e"; // Replace with your contract address
    const marketId = 5; // Example market ID
    const betAmount = price.toString(); // Convert price to string (ETH)

    if (!provider) {
      console.log("Provider is null.");
      return;
    }

    try {
      setIsLoading(true); // Start loading
      setTransactionInfo(null); // Reset previous transaction info

      const receipt = await ethersRPC.interactWithContract(
        provider,
        contractAddress,
        marketId,
        isYes,
        betAmount,
      );

      console.log("Transaction successful:", receipt);
      setTransactionInfo(receipt); // Save transaction info for display

      // Show success toast
      toast.success(`Transaction successful! Hash: ${receipt.transactionHash}`);
    } catch (error) {
      console.error("Error during transaction:", error);
      toast.error("Transaction failed. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4 pb-12">
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

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute z-10 top-[35%] left-[20%] shadow-2xl rounded-2xl">
          <Image
            src={Rocket}
            className="border-2 rounded-xl"
            width={250}
            height={250}
            alt="Loading..."
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col gap-4 p-4 border rounded-2xl shadow-[3px_3px_0px_#94a3b8]">
        <h2 className="text-sm">Jay's Club</h2>
        <div className="flex flex-row justify-between border-b pb-2">
          <div className="flex flex-row items-center gap-2">
            <div className="h-5 w-5 bg-black rounded-full" />
            <h1 className="text-sm font-bold">Jay</h1>
          </div>
          <p className="text-sm">30 days remaining</p>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <div className="bg-gray-200 px-2 py-1 rounded-full">
            <h1>💪</h1>
          </div>
          <div className="text-lg font-semibold">Losing 10kg in 30 days</div>
        </div>

        <div className="flex w-full items-center">
          <div className="h-1 bg-green-400" style={{ width: "50%" }}></div>
          <div className="h-1 bg-red-400" style={{ width: "50%" }}></div>
        </div>
        <div className="flex w-full justify-between mt-2">
          <h2 className="text-green-400">50%</h2>
          <h2 className="text-red-400">50%</h2>
        </div>

        <div className="text-sm">13 Votes</div>
        <div className="flex flex-row gap-2">
          <Button title="Yes" onPress={() => setIsShowPrice(!isShowPrice)} />
          <Button
            title="No"
            className="bg-red-400"
            onPress={() => setIsShowPrice(!isShowPrice)}
          />
        </div>

        {isShowPrice && (
          <div>
            <h2>Choose the amount you want to stake</h2>
            <div className="flex flex-row gap-3 items-center py-4 self-center">
              <button
                onClick={() => setPrice(price - 1)}
                disabled={price <= 0}
                className="p-3 bg-gray-200 rounded-full"
              >
                <Minus />
              </button>
              <div className="flex-grow items-center justify-center">
                <Input
                  value={price}
                  placeholder="0.00"
                  label="Price"
                  name="price"
                  onChange={(e: any) => setPrice(e.target.value)}
                />
              </div>
              <button
                onClick={() => setPrice(price + 1)}
                disabled={price >= 50}
                className="p-3 bg-gray-200 rounded-full"
              >
                <Plus />
              </button>
            </div>
            <div className="py-4">
              <Slider price={price} setPrice={setPrice} />
            </div>
            <div className="flex flex-col gap-4 pt-4">
              <Input
                value={message}
                placeholder="Leave a message"
                label="Message"
                name="message"
                onChange={(e: any) => setMessage(e.target.value)}
              />
              <Button title="Confirm" onPress={() => handleBet(true)} />
            </div>
          </div>
        )}

        {/* Transaction Info */}
        {transactionInfo && (
          <div className="px-3 py-3 border rounded-xl flex flex-col gap-1 bg-gray-100">
            <h3 className="text-lg font-bold">Transaction Successful!</h3>
            <p className="break-words">
              <strong>Transaction Hash: </strong>
              {transactionInfo.hash}
            </p>
            <p>
              <strong>Block Number:</strong> {transactionInfo.blockNumber}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
