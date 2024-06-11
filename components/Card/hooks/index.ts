import { useContext } from "react";

import MouseEnterContext from "../context";

/**
 * The useMouseEnter function is used to access the MouseEnterContext within a MouseEnterProvider in
 * TypeScript.
 * @returns The `useMouseEnter` custom hook is being returned. It is used to access the context value
 * provided by the `MouseEnterContext` within a component. If the `MouseEnterContext` is not found, an
 * error is thrown indicating that the hook must be used within a `MouseEnterProvider`.
 */
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);

  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }

  return context;
};
