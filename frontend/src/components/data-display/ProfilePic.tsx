import React from "react";
import Blockies from "react-blockies";

const WalletAvatar = (walletAddress: any) => {
  return (
    <div>
      <Blockies
        seed={walletAddress} // Wallet address or any string
        size={10} // Number of squares per row
        scale={5} // Pixel size of each square
        color="#dfe" // Background color
        bgColor="#aaa" // Color of empty squares
        spotColor="#000" // Color of the blocks
      />
    </div>
  );
};

export default WalletAvatar;
