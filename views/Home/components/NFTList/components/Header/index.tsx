import { BackgroundBeams } from "@/components/Beams";
import { FlipWords } from "@/components/FlipWord";
import { Spacer } from "@nextui-org/spacer";
import React, { useEffect, useState } from "react";

interface HeaderProps {
  length: number;
}
const Header: React.FC<HeaderProps> = ({ length }) => {
  const [timer, setTimer] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) return;
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <Spacer y={4} />
      <BackgroundBeams />

      <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1
            className="relative z-10 text-xl bg-clip-text text-transparent text-center font-bold"
            style={{ fontWeight: 600 }}
          >
            {length === 0 ? (
              "Well, well, well..."
            ) : (
              <>
                {timer === 0 && "Its raining NFTs!"}
                {timer !== 0 && (
                  <span>
                    <span>The rain comes in</span>
                    <FlipWords
                      duration={500}
                      words={["5", "4", "3", "2", "1"]}
                    />
                  </span>
                )}
              </>
            )}
          </h1>

          <Spacer y={2} />

          <p className="max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            {length === 0
              ? "Looks like you don't have any NFTs yet"
              : "Connect your wallet to stop the rain"}
            <br />
            {length === 0
              ? "You cant stop the rain 🙃"
              : "and maybe get some umbrellas 😉"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
