import React from "react";

import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/react";
import { useLabProgram } from "@/programs/lab";
import { Umbrella } from "react-feather";

interface GetUmbrellasProps {}
const GetUmbrellas: React.FC<GetUmbrellasProps> = () => {
  const { invoke, loading: labLoading } = useLabProgram();

  return (
    <div>
      <Spacer y={8} />

      <p
        className="max-w-lg mx-auto my-2 text-sm text-center relative z-10"
        style={{ color: "hsl(var(--nextui-default-500))" }}
      >
        Did you get wet?
      </p>

      <Spacer y={2} />

      <div className="max-w-2xl mx-auto flex justify-center">
        <Button color="secondary" isLoading={labLoading} onClick={invoke}>
          {!labLoading && <Umbrella size={20} />}
          Get some umbrellas
        </Button>
      </div>

      <Spacer y={6} />
    </div>
  );
};

export default GetUmbrellas;
