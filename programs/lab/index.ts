import { useState } from "react";

import { MINT_TOKEN_LAB, VAULT_ACCOUNT, VAULT_PUBKEY } from "@/config/apis";
/* eslint-disable no-console */
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  sendAndConfirmRawTransaction,
} from "@solana/web3.js";

import IDL from "./idl/lab.json";
import { Lab } from "./types/lab";
import { NFT_VAULTS } from "./vault";
import {
  Account,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  createAssociatedTokenAccount,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

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

      const mint = new PublicKey(NFT_VAULTS?.[0]?.account);
      const mintAuthority = await connection.getTokenAccountsByOwner(
        new PublicKey(VAULT_ACCOUNT),
        { mint },
      );

      const owner = wallet.publicKey;

      let associatedToken = await getAssociatedTokenAddress(mint, owner, true);

      try {
        const transaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            associatedToken,
            owner,
            mint,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_PROGRAM_ID,
          ),
        );

        await provider.sendAndConfirm(transaction);
      } catch (error) {
        console.log(error);
      }

      setTimeout(async () => {
        console.log({
          from: mintAuthority.value?.[0].pubkey.toBase58(),
          to: associatedToken?.toBase58(),
        });

        try {
          const tx = await program.methods
            .initialize()
            .accounts({
              mint: mintAuthority.value?.[0].pubkey,
              signer: wallet.publicKey,
              tokenAccount: tokenAccount.value?.[0].pubkey,
              mintTokenAccount: associatedToken,
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

          const txDetails = await program.provider.connection.getTransaction(
            tx,
            {
              commitment: "confirmed",
            },
          );

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
      }, 10_000);
    } catch (error) {
      console.log(error);
    }
  };

  return { invoke: setProgramData, loading };
};
