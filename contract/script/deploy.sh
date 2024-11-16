#!/bin/bash

# Ensure that environment variables are loaded (if using a .env file)
source .env

# Run the forge create command with the correct environment variables
forge create src/MinimumPolymarket.sol:MinimumPolymarket --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify


# forge create src/BetHandler.sol:BetHandler --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify


# forge create src/Polymarket.sol:Polymarket --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --constructor-args-path ./args.json --verify



# forge create --rpc-url https://testnet.evm.nodes.onflow.org \
#     --private-key $FLOW_PRIVATE_KEY \
#     src/MinimumPolymarket.sol:MinimumPolymarket


# forge verify-contract --rpc-url https://testnet.evm.nodes.onflow.org/ \
#     --verifier blockscout \
#     --verifier-url https://evm-testnet.flowscan.io/api \
#     0xC80eA55cEB01f0ea110AC518895e356bdb67AfFe \
#     src/MinimumPolymarket.sol:MinimumPolymarket