/* eslint-disable no-console */
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { PublicKey } from "@metaplex-foundation/js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

import IDL from "./idl/lab.json";
import { Lab } from "./types/lab";
import { useState } from "react";
import { MINT_TOKEN_LAB, VAULT_PUBKEY } from "@/config/apis";

/**
 * The `useProgram` function sets up a connection, wallet, and program data for a specific program in
 * TypeScript.
 * @returns The `useProgram` function returns an object with a single property `invoke` which is set to
 * the `setProgramData` function.
 */

export const useLabProgram = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [loading, setLoading] = useState(false);

  const setProgramData = async () => {
    setLoading(true);

    try {
      if (!wallet) return;

      const provider = new AnchorProvider(connection, wallet, {});

      setProvider(provider);

      const program = new Program<Lab>(IDL as unknown as Lab, provider);

      const tokenId = MINT_TOKEN_LAB;
      const tokenAccount = await connection.getTokenAccountsByOwner(
        wallet.publicKey,
        { mint: new PublicKey(tokenId) },
      );

      const vaultPubKey = VAULT_PUBKEY;
      const vaultAccount = new PublicKey(vaultPubKey);

      const tx = await program.methods
        .initialize()
        .accounts({
          signer: wallet.publicKey,
          tokenAccount: tokenAccount.value?.[0].pubkey,
          vaultTokenAccount: vaultAccount,
        })
        .rpc();

      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: tx,
        },
        "confirmed",
      );

      const txDetails = await program.provider.connection.getTransaction(tx, {
        commitment: "confirmed",
      });

      const logs = txDetails?.meta?.logMessages || null;

      if (!logs) {
        console.log("No logs found");
      }

      console.log(logs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { invoke: setProgramData, loading };
};
