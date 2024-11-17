"use client";

import Button from "@/components/data-display/Button";
import Input from "@/components/data-display/Input";
import ReusableModal from "@/components/data-display/Modal";
import useGlobalRequestStore from "@/hooks/useGlobalRequestStore";
import useRequest from "@/hooks/useRequest";
import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import Slider from "@/components/data-display/Slider";
import ethersRPC from "@/utils/ethersRPC";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import Image from "next/image";
import Rocket from "../assets/rocket.gif";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [isShowPrice, setIsShowPrice] = useState(false);

  const { provider, web3Auth } = useWeb3Auth();

  const { loading, data, trigger } = useRequest({
    key: "contractbets",
    url: "contract/get-bets",
  });

  const { execute } = useGlobalRequestStore();

  const handleBet = async (result: boolean) => {
    const contractAddress = "0x8c0122481be8E495e4435f1Bc652DcD16AAD6C7e"; // Replace with your deployed contract address
    const marketId = 5; // Example market ID
    const isYes = true; // Example: Betting Yes
    const betAmount = "0.00001"; // Amount in ETH

    if (provider) {
      const receipt = await ethersRPC.interactWithContract(
        provider,
        contractAddress,
        marketId,
        isYes,
        betAmount,
      );

      console.log("Transaction successful:", receipt);
    } else {
      console.log("Provider is null.");
    }
    // await execute(
    //   "placeBet",
    //   { method: "POST", url: "contract/placeBet" },
    //   {
    //     data: { marketId: 5, _isYes: result, amountInEther: price },
    //     onSuccess: (data) => router.push("/challenges"),
    //     onError: (error) => console.log("error", error),
    //   },
    // );
  };

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
      {/* <div className="absolute top-[35%] left-[20%] shadow-2xl rounded-2xl">
        <Image
          src={Rocket}
          className="border-2 rounded-xl"
          width={250}
          height={250}
          alt="gif"
        />
      </div> */}
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
        <div>
          <div className="flex w-full items-center">
            <div className="h-1 bg-green-400" style={{ width: "50%" }}></div>
            <div className="h-1 bg-red-400" style={{ width: "50%" }}></div>
          </div>
          <div className="flex w-full justify-between mt-2">
            <h2 className="text-green-400">50%</h2>
            <h2 className="text-red-400">50%</h2>
          </div>
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
                disabled={price < 0 || price === 0}
                className="p-3 bg-gray-200 rounded-full"
              >
                <Minus />
              </button>
              <div className="flex-grow items-center justify-center">
                <Input
                  value={price}
                  placeholder="0.00"
                  label="price"
                  name="price"
                  onChange={(e: any) => setPrice(e.target.value)}
                />
              </div>
              <button
                onClick={() => setPrice(price + 1)}
                disabled={price > 49 || price === 50}
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
                label="price"
                name="price"
                onChange={(e: any) => setMessage(e.target.value)}
              />
              <Button title="Confirm" onPress={() => handleBet(true)} />
            </div>
          </div>
        )}
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
