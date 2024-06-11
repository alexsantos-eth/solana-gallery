import { useEffect, useState } from "react";

import { SOL_RPC } from "@/config/apis";
import { keypairIdentity, Metaplex } from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair } from "@solana/web3.js";

import { NFTBase, NFTMeta } from "../types";

/**
 * The `useNFTList` function fetches a list of NFTs owned by a specific public key using Metaplex and
 * returns the list along with loading and error states.
 * @returns The `useNFTList` custom hook returns an object with three properties:
 * 1. `nfts`: An array of NFTBase objects representing the NFTs owned by the current user.
 * 2. `loading`: A boolean value indicating whether the data is currently being loaded.
 * 3. `error`: Any error that occurred during the fetching of NFT data.
 */
export const useNFTList = () => {
  const [nfts, setNfts] = useState<NFTMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchNFTs = async () => {
      const connection = new Connection(SOL_RPC);
      const keypair = Keypair.generate();

      const metaplex = new Metaplex(connection);

      metaplex.use(keypairIdentity(keypair));

      if (!publicKey) return;

      const allNFTs = (await metaplex
        .nfts()
        .findAllByOwner({ owner: publicKey })) as NFTBase[];

      const allNftsMetadataRequest = allNFTs.map(async (nft) =>
        fetch(nft.uri).then((response) => response.json()),
      ) as Promise<NFTMeta>[];

      const parsedNFTs = await Promise.all(allNftsMetadataRequest);

      return parsedNFTs;
    };

    setLoading(true);
    fetchNFTs()
      .then((nfts) => {
        setNfts(nfts || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [publicKey]);

  return {
    nfts,
    loading,
    error,
  };
};
