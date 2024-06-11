// src/NFTList.js
import React, { useEffect, useState } from "react";

import { keypairIdentity, Metaplex } from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair } from "@solana/web3.js";

const NFTList = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchNFTs = async () => {
      const connection = new Connection(
        `https://mainnet.helius-rpc.com/?api-key=e97119bc-4b0f-4cc5-a627-5cde680dbea0`,
      );
      const keypair = Keypair.generate();

      const metaplex = new Metaplex(connection);
      metaplex.use(keypairIdentity(keypair));

      if (!publicKey) return;

      const allNFTs = await metaplex
        .nfts()
        .findAllByOwner({ owner: publicKey });

      console.log(allNFTs);
    };

    fetchNFTs();
  }, [publicKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>NFTs</h1>
      <ul>
        {nfts.map((nft, index) => (
          <li key={index}>{nft.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NFTList;
