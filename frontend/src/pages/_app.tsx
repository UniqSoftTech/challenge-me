import React, { useEffect, useState, ReactNode } from "react";
import { AppProps } from "next/app";
import { Epilogue } from "next/font/google";
import { ToastContainer } from "react-toastify";

import SEOHead from "@/components/SeoHead";
import Layout from "@/components/Layout";
import { Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { AuthProvider } from "@/context/authContext";
import { initializeWeb3AuthContext } from "@/context/webContext";

import "@/styles/public.css";
import "react-toastify/dist/ReactToastify.css";

const font = Epilogue({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

type Web3AuthConfig = Parameters<typeof Web3AuthProvider>[0]["config"];

const Web3AuthInitializer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
    <Web3AuthProvider config={web3AuthConfig}>{children}</Web3AuthProvider>
  );
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <main className={font.className}>
        <SEOHead />
        <Web3AuthInitializer>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </Web3AuthInitializer>
      </main>
      <ToastContainer />
    </>
  );
};

export default App;
