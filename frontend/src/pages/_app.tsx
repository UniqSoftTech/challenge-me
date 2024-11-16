import React, { useState, ReactNode, useEffect } from "react";
import { AppProps } from "next/app";
import SEOHead from "@/components/SeoHead";
import { Web3AuthProvider } from "@/context/Web3AuthContext";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {}, []);

  return (
    <>
      <SEOHead />

      <Component {...pageProps} />
    </>
  );
};

export default App;
