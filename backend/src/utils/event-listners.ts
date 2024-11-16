import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

// Connect to the Ethereum network using the SEPOLIA RPC URL
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// Contract ABI and address (replace with your contract's address)
const contractAbi = [
  // Include the ABI of your contract here (the portion you've shown with the events)
  {
    "type": "event",
    "name": "BetPlaced",
    "inputs": [
      { "name": "marketId", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "better", "type": "address", "indexed": false, "internalType": "address" },
      { "name": "isYes", "type": "bool", "indexed": false, "internalType": "bool" },
      { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "MarketCreated",
    "inputs": [
      { "name": "marketId", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "question", "type": "string", "indexed": false, "internalType": "string" }
    ]
  },
  {
    "type": "event",
    "name": "MarketResolved",
    "inputs": [
      { "name": "marketId", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "resolvedYes", "type": "bool", "indexed": false, "internalType": "bool" }
    ]
  }
];

// Create contract instance
const contractAddress = process.env.CONTRACT_ADDRESS!;
const contract = new ethers.Contract(contractAddress, contractAbi, provider);

// Event listener for "BetPlaced"
contract.on("BetPlaced", (marketId: number, better: string, isYes: boolean, amount: number) => {
  console.log(`BetPlaced event: MarketId: ${marketId}, Better: ${better}, IsYes: ${isYes}, Amount: ${amount}`);
  // You can send this data to your Express.js server or perform any additional logic
});

// Event listener for "MarketCreated"
contract.on("MarketCreated", (marketId: number, question: string) => {
  console.log(`MarketCreated event: MarketId: ${marketId}, Question: ${question}`);
  // Handle event, e.g., store it in the database or notify users
});

// Event listener for "MarketResolved"
contract.on("MarketResolved", (marketId: number, resolvedYes: boolean) => {
  console.log(`MarketResolved event: MarketId: ${marketId}, ResolvedYes: ${resolvedYes}`);
  // Handle event, e.g., update market status
});
