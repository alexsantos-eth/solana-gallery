"use client";

import "@/styles/wallet.css";

import React, { useMemo } from "react";

import { SOL_RPC } from "@/config/apis";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

interface ConnectWalletProviderProps {
  children: React.ReactNode;
}
const ConnectWalletProvider: React.FC<ConnectWalletProviderProps> = ({
  children,
}) => {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={SOL_RPC}>
      <WalletProvider autoConnect wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default ConnectWalletProvider;
