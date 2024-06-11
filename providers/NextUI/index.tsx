"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import React from "react";

import { NextUIProvider as Provider } from "@nextui-org/system";

export interface NextUIProviderProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const NextUIProvider: React.FC<NextUIProviderProps> = ({
  children,
  themeProps = { attribute: "class", defaultTheme: "dark" },
}) => {
  const router = useRouter();

  return (
    <Provider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </Provider>
  );
};

export default NextUIProvider;
