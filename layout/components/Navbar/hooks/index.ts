import { useEffect, useState } from "react";

import { MINT_TOKEN_LAB } from "@/config/apis";
import { AccountLayout } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

/**
 * The `useLabToken` function retrieves metadata for a specific token using the Metaplex library in
 * TypeScript.
 */
export const useLabToken = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [amount, setAmount] = useState<string>("");
  const publicKey = wallet.publicKey;

  useEffect(() => {
    const getMetadata = async () => {
      if (!publicKey) {
        return;
      }

      const tokenAccount = await connection.getTokenAccountsByOwner(publicKey, {
        mint: new PublicKey(MINT_TOKEN_LAB),
      });

      const currentTokenAccount = tokenAccount.value?.[0];

      // PARSE
      if (!currentTokenAccount) {
        return;
      }

      const accountInfo = AccountLayout.decode(
        currentTokenAccount.account.data,
      );
      const amount = accountInfo.amount;
      const parsed = +amount.toString() / 10 ** 9;

      const rounded = Math.round(parsed);

      const formatted = rounded < 10 ? "0" + rounded : rounded + "";

      setAmount(formatted);
    };

    getMetadata();
  }, [publicKey]);

  return { amount };
};
