import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import SEOHead from "@/components/SeoHead";
import { Epilogue } from "next/font/google";
import {
  Web3AuthProvider,
  Web3AuthProviderProps,
} from "@web3auth/modal-react-hooks";
import { AuthProvider } from "@/context/authContext";
import { initializeWeb3AuthContext } from "../context/web3AuthContext";

import "../styles/public.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const font = Epilogue({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

// Define the type for the Web3Auth context config
type Web3AuthConfig = Web3AuthProviderProps["config"];

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [web3AuthConfig, setWeb3AuthConfig] = useState<Web3AuthConfig | null>(
    null,
  );

  useEffect(() => {
    const initWeb3Auth = async () => {
      const config = await initializeWeb3AuthContext();
      setWeb3AuthConfig(config);
    };

    initWeb3Auth();
  }, []);

  if (!web3AuthConfig) {
    return <div>Loading Web3Auth...</div>;
  }

  return (
    <>
      <main className={font.className}>
        <SEOHead />
        <Web3AuthProvider config={web3AuthConfig}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </Web3AuthProvider>
      </main>
      <ToastContainer />
    </>
  );
};

export default App;
