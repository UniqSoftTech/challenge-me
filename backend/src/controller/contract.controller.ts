import { Request, Response } from 'express';
import { ethers } from 'ethers';

// Your contract's ABI (from the JSON you provided)
const contractABI = [
  {
    "type": "function",
    "name": "claimWinnings",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createMarket",
    "inputs": [
      {
        "name": "_question",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "currentMarketId",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "markets",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "question",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "isResolved",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "yesAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "noAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "yesVote",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "placeBet",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_isYes",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "vote",
    "inputs": [
      {
        "name": "_marketId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_votedYes",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "BetPlaced",
    "inputs": [
      {
        "name": "marketId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "better",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "isYes",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MarketCreated",
    "inputs": [
      {
        "name": "marketId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "question",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MarketResolved",
    "inputs": [
      {
        "name": "marketId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "resolvedYes",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  }
]

export class ContractController {
  private contractAddress = "0x31dE00280A9DD51a0e66CBF1Ec2014AF36320EDF";
  private provider = new ethers.JsonRpcProvider('https://base-sepolia.g.alchemy.com/v2/tm10MbToT7jZoizxEnsOGVjkIKryh4-u');
  private privateKey = '6f19f7f109de2a067e2ba84a9de8f16b01907b62db70cb6f9b82d35b12d86485';
  private wallet = new ethers.Wallet(this.privateKey, this.provider);
  private contract = new ethers.Contract(this.contractAddress, contractABI, this.wallet);

  claimWinnings = async (req: Request, res: Response) => {
    try {
      const { marketId } = req.body;

      // Call claimWinnings on your contract
      const tx = await this.contract.claimWinnings(marketId);

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      res.status(200).json({
        message: 'Winnings claimed successfully',
        transactionHash: receipt.transactionHash,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error claiming winnings',
        error: error,
      });
    }
  }

  createMarket = async (req: Request, res: Response) => {
    try {
      const { question } = req.body;

      // Call createMarket on your contract
      const tx = await this.contract.createMarket(question);

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      res.status(200).json({
        message: 'Market created successfully',
        transactionHash: receipt.transactionHash,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating market',
        error: error,
      });
    }
  }

  currentMarketId = async (req: Request, res: Response) => {
    try {
      const { marketId } = req.body;

      // Call currentMarketId on your contract
      const tx = await this.contract.currentMarketId();

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      res.status(200).json({
        message: 'Market created successfully',
        transactionHash: receipt.transactionHash,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating market',
        error: error,
      });
    }
  }
}
