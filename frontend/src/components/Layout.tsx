import React, { useState, ReactNode } from "react";
import Footer from "./Footer";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="bg-white">
      <main>
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
