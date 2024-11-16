import React, { useState, ReactNode, useEffect } from "react";
import { AppProps } from "next/app";
import SEOHead from "@/components/SeoHead";
import { Web3AuthProvider } from "@/context/Web3AuthContext";
import "../styles/public.css";
import { AuthProvider } from "@/context/authContext";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {}, []);

  return (
    <>
      <SEOHead />

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default App;
