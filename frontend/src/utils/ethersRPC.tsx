//Fetched from web3auth docs

import type { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

const contractABI = [
  {
    type: "function",
    name: "claimWinnings",
    inputs: [
      {
        name: "_marketId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createMarket",
    inputs: [
      {
        name: "_question",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "currentMarketId",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMarketInfoForAddress",
    inputs: [
      {
        name: "_address",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct MinimumPolymarket.MarketInfo[]",
        components: [
          {
            name: "marketId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "question",
            type: "string",
            internalType: "string",
          },
          {
            name: "isCreator",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isYesVoter",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isNoVoter",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "markets",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "question",
        type: "string",
        internalType: "string",
      },
      {
        name: "isResolved",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "yesAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "noAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "marketCreator",
        type: "address",
        internalType: "address",
      },
      {
        name: "yesVote",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "placeBet",
    inputs: [
      {
        name: "_marketId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_isYes",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "vote",
    inputs: [
      {
        name: "_marketId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_votedYes",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BetPlaced",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "better",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "isYes",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MarketCreated",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "question",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MarketResolved",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "resolvedYes",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
];
const getChainId = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails.chainId.toString();
  } catch (error) {
    return error;
  }
};

const getAccounts = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    const address = signer.getAddress();

    return await address;
  } catch (error) {
    return error;
  }
};

const getBalance = async (provider: IProvider): Promise<string> => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    const address = signer.getAddress();

    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address),
    );

    return balance;
  } catch (error) {
    return error as string;
  }
};

const sendTransaction = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();

    const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";

    const amount = ethers.parseEther("0.001");
    const fees = await ethersProvider.getFeeData();

    const tx = await signer.sendTransaction({
      to: destination,
      value: amount,
      maxPriorityFeePerGas: fees.maxPriorityFeePerGas,
      maxFeePerGas: fees.maxFeePerGas,
    });

    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    return error as string;
  }
};

const interactWithContract = async (
  provider: IProvider,
  contractAddress: string,
  marketId: number,
  isYes: boolean,
  betAmount: string, // in ETH
): Promise<any> => {
  try {
    // Create ethers provider
    const ethersProvider = new ethers.BrowserProvider(provider);

    // Get the signer
    const signer = await ethersProvider.getSigner();

    // Connect to the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Convert betAmount to Wei
    const valueInWei = ethers.parseEther(betAmount);

    // Call the placeBet function
    const tx = await contract.placeBet(marketId, isYes, {
      value: valueInWei, // ETH to send
    });

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error interacting with contract:", error);
    throw error;
  }
};

const signMessage = async (provider: IProvider): Promise<any> => {
  try {
    const ethersProvider = new ethers.BrowserProvider(provider);

    const signer = await ethersProvider.getSigner();
    const originalMessage = "YOUR_MESSAGE";

    const signedMessage = await signer.signMessage(originalMessage);

    return signedMessage;
  } catch (error) {
    return error as string;
  }
};

export default {
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
  interactWithContract,
};
