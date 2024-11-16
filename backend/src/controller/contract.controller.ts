import { Request, Response } from 'express';
import { ethers } from 'ethers';
import { contract_address, json_rpc_url, private_key } from '../configs/config';

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
  private contractAddress = contract_address;
  private privateKey = private_key;

  private provider = new ethers.JsonRpcProvider(json_rpc_url);
  private wallet = new ethers.Wallet(this.privateKey, this.provider);
  private contract = new ethers.Contract(this.contractAddress, contractABI, this.wallet);

  // // Listen for MarketCreated Event
  // this.contract.on('MarketCreated', (marketId: ethers.BigNumber, question: string) => {
  //   console.log(`Market Created: ID ${marketId.toString()}, Question: ${question}`);
  //   // You can send this data to the frontend or process it further here.
  // });

  // // Listen for BetPlaced Event
  // this.contract.on('BetPlaced', (marketId: ethers.BigNumber, better: string, isYes: boolean, amount: ethers.BigNumber) => {
  //   console.log(`Bet Placed: Market ID ${marketId.toString()}, Better: ${better}, Is Yes: ${isYes}, Amount: ${ethers.utils.formatEther(amount)} ETH`);
  //   // Process or notify the user about the bet placed
  // });

  // // Listen for MarketResolved Event
  // this.contract.on('MarketResolved', (marketId: ethers.BigNumber, resolvedYes: boolean) => {
  //   console.log(`Market Resolved: Market ID ${marketId.toString()}, Resolved Yes: ${resolvedYes}`);
  //   // Handle the resolution logic (e.g., notify users about the outcome)
  // });

  claimWinnings = async (req: Request, res: Response) => {
    try {
      const { marketId } = req.body;

      // Call claimWinnings on your contract
      const tx = await this.contract.claimWinnings(marketId);

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      res.status(200).json({
        message: 'Winnings claimed successfully',
        data: {
          transactionHash: receipt.transactionHash,

        }
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
        data: {
          transactionHash: receipt.transactionHash,
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating market',
        error: error,
      });
    }
  }

  placeBet = async (req: Request, res: Response) => {
    try {
      const { marketId, _isYes, amountInEther } = req.body;

      // Convert amountInEther to wei (since Ethereum uses wei for small units)
      const amountInWei = ethers.parseEther(amountInEther.toString());

      // Call placeBet on the contract with the specified amount (msg.value) and other parameters
      const tx = await this.contract.placeBet(marketId, _isYes, { value: amountInWei });

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      res.status(200).json({
        message: 'Bet placed successfully',
        data: {
          transactionHash: receipt.transactionHash,
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error placing bet',
        error: error,
      });
    }
  };

  vote = async (req: Request, res: Response) => {
    try {
      const { marketId, _votedYes } = req.body;  // Get marketId and _votedYes from request body

      // Call vote function on the contract
      const tx = await this.contract.vote(marketId, _votedYes);

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      res.status(200).json({
        message: 'Vote submitted successfully',
        data: {
          transactionHash: receipt.transactionHash
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error submitting vote',
        error: error,
      });
    }
  }
}
