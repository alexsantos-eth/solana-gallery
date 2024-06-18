import Image from "next/image";
import NextLink from "next/link";
import React from "react";

import ThemeSwitch from "@/components/ThemeSwitch";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { useLabToken } from "./hooks";

export const Navbar: React.FC = () => {
  const { amount } = useLabToken();

  return (
    <NextUINavbar maxWidth="xl" style={{ position: "fixed" }}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* LOGO */}
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image alt="logo" height={30} src="/logo.png" width={30} />
          </NextLink>

          <NavbarItem>
            <h2>
              <span style={{ fontWeight: 700 }}>{amount}</span> LAB02
            </h2>
          </NavbarItem>
        </NavbarBrand>
      </NavbarContent>

      {/* DESKTOP */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarItem>
          <WalletMultiButton />
        </NavbarItem>

        <NavbarItem className="leading-0">
          <div className="mt-2">
            <ThemeSwitch />
          </div>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
