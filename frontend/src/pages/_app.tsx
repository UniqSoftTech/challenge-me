import React, { useState, ReactNode, useEffect } from "react";
import { AppProps } from "next/app";
import SEOHead from "@/components/SeoHead";

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
