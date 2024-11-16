// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
// Importing the CadenceRandomConsumer for random address selection
import { CadenceRandomConsumer } from "@flow-sol-utils/src/random/CadenceRandomConsumer.sol";

contract MinimumPolymarket is CadenceRandomConsumer {
    struct Market {
        string question;
        bool isResolved;
        uint256 yesAmount;
        uint256 noAmount;
        mapping(address => uint256) yesPositions;
        mapping(address => uint256) noPositions;
        mapping(address => bool) hasVoted;
        bool yesVote;
        address createdBy; // Store the address that created the market

        // Arrays to store the voters' addresses
        address[] yesVoters;
        address[] noVoters;
    }

    uint256 public currentMarketId;
    mapping(uint256 => Market) public markets;

    event MarketCreated(uint256 marketId, string question);
    event BetPlaced(uint256 marketId, address better, bool isYes, uint256 amount);
    event MarketResolved(uint256 marketId, bool resolvedYes, address winner);

    function createMarket(string memory _question) external {
        uint256 marketId = currentMarketId++;
        Market storage market = markets[marketId];

        market.question = _question;
        market.createdBy = msg.sender; // Store the creator's address

        emit MarketCreated(marketId, _question);
    }

    function placeBet(uint256 _marketId, bool _isYes) external payable {
        Market storage market = markets[_marketId];
        require(!market.isResolved, "Market is already resolved");
        require(msg.value > 0, "Bet amount must be positive");

        if (_isYes) {
            market.yesAmount += msg.value;
            market.yesPositions[msg.sender] += msg.value;
            market.yesVoters.push(msg.sender); // Add to the yesVoters array
        } else {
            market.noAmount += msg.value;
            market.noPositions[msg.sender] += msg.value;
            market.noVoters.push(msg.sender); // Add to the noVoters array
        }

        emit BetPlaced(_marketId, msg.sender, _isYes, msg.value);
    }

    // Function to resolve the market and select a random address from yes or no positions
    function vote(uint256 _marketId, bool _votedYes) external {
        Market storage market = markets[_marketId];
        require(!market.isResolved, "Market already resolved");

        // Resolve the market only after votes are placed
        market.yesVote = _votedYes;
        market.isResolved = true;

        // Select a random address from the positions
        address winner = selectRandomVoter(_marketId);

        emit MarketResolved(_marketId, _votedYes, winner);
    }

    // Function to randomly select a voter (exclude the creator)
    function selectRandomVoter(uint256 _marketId) internal returns (address) {
        Market storage market = markets[_marketId];

        // Create an array of addresses from the yes and no positions
        address[] memory allVoters = new address[](market.yesVoters.length + market.noVoters.length);
        uint256 index = 0;

        // Add voters from yesPositions
        for (uint256 i = 0; i < market.yesVoters.length; i++) {
            if (market.yesVoters[i] != market.createdBy) { // Exclude the market creator
                allVoters[index++] = market.yesVoters[i];
            }
        }

        // Add voters from noPositions
        for (uint256 i = 0; i < market.noVoters.length; i++) {
            if (market.noVoters[i] != market.createdBy) { // Exclude the market creator
                allVoters[index++] = market.noVoters[i];
            }
        }

        // Generate a random index using CadenceRandomConsumer
        uint256 randomIndex = getRandomNumber(allVoters.length);

        // Return the randomly selected address
        return allVoters[randomIndex];
    }

    // Function to claim winnings for the selected winner (if resolved)
    function claimWinnings(uint256 _marketId) external {
        Market storage market = markets[_marketId];
        require(market.isResolved, "Market not resolved");

        uint256 winningAmount;
        address winner;

        if (market.yesVote) {
            winningAmount = market.yesPositions[msg.sender];
            market.yesPositions[msg.sender] = 0;
            winner = msg.sender;
        } else {
            winningAmount = market.noPositions[msg.sender];
            market.noPositions[msg.sender] = 0;
            winner = msg.sender;
        }

        require(winningAmount > 0, "No winnings to claim");

        uint256 totalPool = market.yesAmount + market.noAmount;
        uint256 payout = (winningAmount * totalPool) / (market.yesVote ? market.yesAmount : market.noAmount);

        (bool success,) = payable(winner).call{value: payout}("");
        require(success, "Transfer failed");
    }
}
