import { useEffect, useState } from "react";

import {
  JsonMetadata,
  Metaplex,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

/**
 * The `useNFTList` function fetches a list of NFTs owned by a specific public key using Metaplex and
 * returns the list along with loading and error states.
 * @returns The `useNFTList` custom hook returns an object with three properties:
 * 1. `nfts`: An array of NFTBase objects representing the NFTs owned by the current user.
 * 2. `loading`: A boolean value indicating whether the data is currently being loaded.
 * 3. `error`: Any error that occurred during the fetching of NFT data.
 */
export const useNFTList = () => {
  const [loading, setLoading] = useState(true);
  const [nftData, setNftData] = useState<JsonMetadata[]>([]);
  const { connection } = useConnection();
  const wallet = useWallet();
  const publicKey = wallet.publicKey;

  useEffect(() => {
    // CONSTANTS
    const metaplex = Metaplex.make(connection).use(
      walletAdapterIdentity(wallet),
    );

    const fetchNfts = async () => {
      if (!wallet.connected) {
        return;
      }

      if (!publicKey) {
        return;
      }

      const NFTs = await metaplex.nfts().findAllByOwner({
        owner: publicKey,
      });

      setLoading(false);
      setNftData(NFTs.map((nft) => ({ name: nft.name })));

      const ntfRequests: Promise<JsonMetadata>[] = NFTs.map(
        (nft, index) =>
          new Promise((resolve) => {
            setTimeout(async () => {
              try {
                let fetchResult = await fetch(nft.uri);
                let json = await fetchResult.json();

                setNftData((prev) => {
                  const newNftData = [...prev];

                  newNftData[index] = json;

                  return newNftData;
                });
                resolve(json);
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
                resolve({});
              }
            }, 1000 * index);
          }),
      );

      return Promise.all(ntfRequests);
    };

    setLoading(false);
    fetchNfts().catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  }, [publicKey]);

  return {
    nfts: nftData,
    loading,
  };
};
