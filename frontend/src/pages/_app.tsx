import React, { useState, ReactNode, useEffect } from "react";
import { AppProps } from "next/app";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {}, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
