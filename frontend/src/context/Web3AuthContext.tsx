"use client";

import { AuthAdapter, MFA_LEVELS } from "@web3auth/auth-adapter";
import { UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthOptions } from "@web3auth/modal";
import { chainConfig } from "@/utils/chainUtils";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
  chainConfig,
};

const authAdapter = new AuthAdapter({
  loginSettings: {
    mfaLevel: MFA_LEVELS.OPTIONAL,
  },
  adapterSettings: {
    uxMode: UX_MODE.REDIRECT, // "redirect" | "popup"
  },
});

// Wrap async logic in a function
export const initializeWeb3AuthContext = async () => {
  try {
    const adapters = await getDefaultExternalAdapters({
      options: web3AuthOptions,
    });

    return {
      web3AuthOptions,
      adapters: [authAdapter, ...adapters],
      plugins: [],
    };
  } catch (error) {
    console.error("Error initializing Web3Auth context:", error);
    return {
      web3AuthOptions,
      adapters: [authAdapter],
      plugins: [],
    };
  }
};
