#!/bin/bash

# Ensure that environment variables are loaded (if using a .env file)
source .env

# Run the forge create command with the correct environment variables
forge create src/PolyToken.sol:PolyToken --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify


forge create src/BetHandler.sol:BetHandler --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify


# forge create src/Polymarket.sol:Polymarket --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --constructor-args-path ./args.json --verify