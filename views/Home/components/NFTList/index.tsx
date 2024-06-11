import Image from "next/image";
import React from "react";

import Card from "@/components/Card";
import { Spacer } from "@nextui-org/spacer";

import { useNFTList } from "./hooks";

const NFTList: React.FC = () => {
  const { loading, error, nfts } = useNFTList();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>NFTs</h1>
      <ul>
        {nfts.map((nft, index) => (
          <Card.Container key={index}>
            <Card.Body className="bg-text">
              <Card.Item
                as="h2"
                className="text-xl text-default-900"
                translateZ="50"
              >
                {nft.name}
              </Card.Item>
              <Card.Item as="p" translateZ="60">
                {nft.description}
              </Card.Item>

              <Spacer y={4} />

              <Card.Item
                className="w-full rounded-lg overflow-hidden"
                translateZ="100"
              >
                <Image
                  alt="thumbnail"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  height="300"
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width="300"
                />
              </Card.Item>
            </Card.Body>
          </Card.Container>
        ))}
      </ul>
    </div>
  );
};

export default NFTList;
