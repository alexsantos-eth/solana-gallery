"use client";

import React from "react";

import ConnectWalletProvider from "./ConnectWallet";
import NextUIProvider from "./NextUI";

export interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <NextUIProvider>
      <ConnectWalletProvider>{children}</ConnectWalletProvider>
    </NextUIProvider>
  );
};

export default Providers;
