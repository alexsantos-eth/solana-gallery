import Image from "next/image";
import React from "react";

import Card from "@/components/Card";
import { JsonMetadata } from "@metaplex-foundation/js";
import { Skeleton } from "@nextui-org/react";
import { Spacer } from "@nextui-org/spacer";
import { useWallet } from "@solana/wallet-adapter-react";

import Header from "./components/Header";
import { useNFTList } from "./hooks";

const BOX_SIZE = 200;
const NFTList: React.FC = () => {
  const { nfts, loading } = useNFTList();
  const { connected } = useWallet();

  const length = nfts.length;

  if (loading || !connected) {
    return <Header length={1} />;
  }

  if (connected && !length && !loading) {
    return <Header length={length} />;
  }

  return (
    <>
      <Spacer y={4} />
      <div
        className="w-full grid py-4"
        style={{
          gap: "30px",
          gridTemplateColumns: `repeat(auto-fill, minmax(${BOX_SIZE}px, 1fr))`,
        }}
      >
        {Array.from({ length }).map((nft, index) => {
          const nftData = nfts[index] as JsonMetadata | undefined;

          return (
            <Card.Container key={index}>
              <Card.Body>
                <Card.Item as="div" className="w-[80%]" translateZ="50">
                  {nftData?.name ? (
                    <p className="font-bold truncate leading-none">
                      {nftData?.name}
                    </p>
                  ) : (
                    <Skeleton
                      as="div"
                      className="h-6 w-full rounded-lg "
                      style={{
                        backgroundColor: "hsl(var(--nextui-default-200))",
                      }}
                    >
                      <div className="h-6 w-full rounded-lg" />
                    </Skeleton>
                  )}
                </Card.Item>

                <Spacer y={nftData?.description ? 2 : 2} />

                <Card.Item as="div" className="w-full" translateZ="60">
                  {nftData?.description ? (
                    <p className="truncate text-default-600 text-sm leading-none">
                      {nftData?.description}
                    </p>
                  ) : (
                    <Skeleton
                      as="div"
                      className="h-5 w-full rounded-lg"
                      style={{
                        backgroundColor: "hsl(var(--nextui-default-200))",
                      }}
                    >
                      <div className="h-5 w-full rounded-lg " />
                    </Skeleton>
                  )}
                </Card.Item>

                <Spacer y={4} />

                <Card.Item
                  className="w-full rounded-lg overflow-hidden"
                  style={{
                    height: `${BOX_SIZE}px`,
                    backgroundColor: "hsl(var(--nextui-default-200))",
                  }}
                  translateZ="100"
                >
                  {nftData?.image ? (
                    <Image
                      fill
                      alt="thumbnail"
                      className="object-cover rounded-lg"
                      src={nftData?.image}
                    />
                  ) : (
                    <Skeleton
                      as="div"
                      className="w-full rounded-lg"
                      style={{
                        height: `${BOX_SIZE}px`,
                        backgroundColor: "hsl(var(--nextui-default-200))",
                      }}
                    >
                      <div className="h-50 w-full rounded-lg" />
                    </Skeleton>
                  )}
                </Card.Item>
              </Card.Body>
            </Card.Container>
          );
        })}
      </div>
    </>
  );
};

export default NFTList;
