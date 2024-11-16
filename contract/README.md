## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```


```sh
forge verify-contract 0xa282C9B02FCBD1Abdb27a876ff68FABecb730D37 ./src/Polymarket.sol:Polymarket --chain 84532 --constructor-args "0xa282C9B02FCBD1Abdb27a876ff68FABecb730D37" --etherscan-api-key $ETHERSCAN_API_KEY
```


```sh
forge create src/Polymarket.sol:Polymarket --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --constructor-args "0xa282C9B02FCBD1Abdb27a876ff68FABecb730D37"  --verify
```

```sh
forge verify-contract 0x845c57E8d8c39922E1fa08b12c5E56B829174A0b src/Polymarket.sol:Polymarket --chain 84532 --constructor-args "0x845c57E8d8c39922E1fa08b12c5E56B829174A0b" 
```


cast wallet new

Successfully created new keypair.
Address:     0xC7085EBBE0e385ec7Edbb7e8D421D4bFe9163DE5
Private key: 0xb9b0a974a7ece96764c58675ca363e501cf444b61f55068c4d7afc9fee592c45

forge create --rpc-url https://testnet.evm.nodes.onflow.org \
    --private-key $DEPLOYER_PRIVATE_KEY \
    --constructor-args 42000000 \
    --legacy \
    src/MyToken.sol:MyToken


flow accounts get 0xC7085EBBE0e385ec7Edbb7e8D421D4bFe9163DE5 --network testnet
