import { Request, Response } from 'express';
import { ethers } from 'ethers';
import { contract_address, json_rpc_url, private_key } from '../configs/config';
import { getABI, getTransactions, searchTokens } from '../utils/func.untils';
import { ChallengeController } from './challenge.controller';
import db from '../models/_index';

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
    "name": "getMarketInfoForAddress",
    "inputs": [
      {
        "name": "_address",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct MinimumPolymarket.MarketInfo[]",
        "components": [
          {
            "name": "marketId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "question",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "isCreator",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isYesVoter",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isNoVoter",
            "type": "bool",
            "internalType": "bool"
          }
        ]
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
        "name": "marketCreator",
        "type": "address",
        "internalType": "address"
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

interface MarketInfo {
  marketId: bigint;
  question: string;
  isCreator: boolean;
  isYesVoter: boolean;
  isNoVoter: boolean;
};

export class ContractController {
  private contractAddress = contract_address;
  private privateKey = private_key;

  private provider = new ethers.JsonRpcProvider(json_rpc_url);
  private wallet = new ethers.Wallet(this.privateKey, this.provider);
  private contract = new ethers.Contract(this.contractAddress, contractABI, this.wallet);
  private challenge = new ChallengeController();

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
          transactionHash: JSON.stringify(receipt),
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
          transactionHash: JSON.stringify(receipt),
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
  };

  getMarketInfo = async (req: any, res: any) => {
    const address = req?.user?.wallet;

    try {
      // Call the smart contract's `getMarketInfoForAddress` function
      const marketInfo: MarketInfo[] = await this.contract.getMarketInfoForAddress(address);

      const data = await Promise.all(marketInfo.map((market: any) => {
        return {
          marketId: market[0].toString(),  // Convert BigInt to string
          question: market[1],
          isCreator: market[2],
          isYesVoter: market[3],
          isNoVoter: market[4],
        };
      }))

      // Return the data to the client
      const temp = await db.Challenge.findAll({ where: { created_by: req?.user?.id } });
      res.status(200).json({ data: temp, status: true });
    } catch (error) {
      console.error('Error fetching market info:', error);
      res.status(500).json({ message: 'Error fetching market information', error: error });
    }
  }

  getTnxData = async (req: any, res: any) => {
    try {
      const data = await getTransactions(req?.body?.address);
      res.status(200).send({ status: true, data });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  getTokensBySearch = async (req: any, res: any) => {
    try {
      const data = await searchTokens(req?.body?.query);
      res.status(200).send({ status: true, data });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  getABI = async (req: any, res: any) => {
    try {
      const data = await getABI(req?.body?.address);
      res.status(200).send({ status: true, data });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
