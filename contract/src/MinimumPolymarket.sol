// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract MinimumPolymarket {

    struct Market {
        string question;
        bool isResolved;
        uint256 yesAmount;
        uint256 noAmount;
        mapping(address => uint256) yesPositions;
        mapping(address => uint256) noPositions;
        address[] yesVoters;    // Array of addresses that voted yes
        address[] noVoters;     // Array of addresses that voted no
        address marketCreator;  // The address that created the market
        bool yesVote;
    }

    // Define a struct to store the market info for a specific address
    struct MarketInfo {
        uint256 marketId;
        string question;
        bool isCreator;
        bool isYesVoter;
        bool isNoVoter;
    }

    uint256 public currentMarketId;
    mapping(uint256 => Market) public markets;

    event MarketCreated(uint256 marketId, string question);
    event BetPlaced(uint256 marketId, address better, bool isYes, uint256 amount);
    event MarketResolved(uint256 marketId, bool resolvedYes);

    function createMarket(string memory _question) external {
        uint256 marketId = currentMarketId++;
        Market storage market = markets[marketId];

        market.question = _question;
        market.marketCreator = msg.sender; // Set the creator of the market

        emit MarketCreated(marketId, _question);
    }

    function placeBet(uint256 _marketId, bool _isYes) external payable {
        Market storage market = markets[_marketId];
        require(!market.isResolved, "Market is already resolved");
        require(msg.value > 0, "Bet amount must be positive");

        if (_isYes) {
            market.yesAmount += msg.value;
            market.yesPositions[msg.sender] += msg.value;
            market.yesVoters.push(msg.sender); // Add the address to yesVoters
        } else {
            market.noAmount += msg.value;
            market.noPositions[msg.sender] += msg.value;
            market.noVoters.push(msg.sender); // Add the address to noVoters
        }

        emit BetPlaced(_marketId, msg.sender, _isYes, msg.value);
    }

    function vote(uint256 _marketId, bool _votedYes) external {
        Market storage market = markets[_marketId];
        require(!market.isResolved, "Market already resolved");

        market.yesVote = _votedYes;
        market.isResolved = true;

        emit MarketResolved(_marketId, _votedYes);
    }

    // Function to get the market info for an address
    function getMarketInfoForAddress(address _address) external view returns (MarketInfo[] memory) {
        MarketInfo[] memory marketInfoArray = new MarketInfo[](currentMarketId);
        uint256 marketCount = 0;

        // Loop through all markets and check the given address
        for (uint256 marketId = 0; marketId < currentMarketId; marketId++) {
            Market storage market = markets[marketId];

            bool isCreator = false;
            bool isYesVoter = false;
            bool isNoVoter = false;

            // Check if the address is the market creator
            if (market.marketCreator == _address) {
                isCreator = true;
            }

            // Check if the address voted "yes"
            for (uint256 i = 0; i < market.yesVoters.length; i++) {
                if (market.yesVoters[i] == _address) {
                    isYesVoter = true;
                    break;
                }
            }

            // Check if the address voted "no"
            for (uint256 i = 0; i < market.noVoters.length; i++) {
                if (market.noVoters[i] == _address) {
                    isNoVoter = true;
                    break;
                }
            }

            // If the address is involved in the market, add it to the array
            if (isCreator || isYesVoter || isNoVoter) {
                marketInfoArray[marketCount] = MarketInfo({
                    marketId: marketId,
                    question: market.question,
                    isCreator: isCreator,
                    isYesVoter: isYesVoter,
                    isNoVoter: isNoVoter
                });
                marketCount++;
            }
        }

        return marketInfoArray;
    }

    function claimWinnings(uint256 _marketId) external {
        Market storage market = markets[_marketId];
        require(market.isResolved, "Market not resolved");

        uint256 winningAmount;

        if (market.yesVote) {
            winningAmount = market.yesPositions[msg.sender];
            market.yesPositions[msg.sender] = 0;
        } else {
            winningAmount = market.noPositions[msg.sender];
            market.noPositions[msg.sender] = 0;
        }

        require(winningAmount > 0, "No winnings to claim");

        uint256 totalPool = market.yesAmount + market.noAmount;
        uint256 payout = (winningAmount * totalPool) / (market.yesVote ? market.yesAmount : market.noAmount);

        (bool success,) = payable(msg.sender).call{value: payout}("");
        require(success, "Transfer failed");
    }
}
