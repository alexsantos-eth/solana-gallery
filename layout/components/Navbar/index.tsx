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
import { Button } from "@nextui-org/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Navbar: React.FC = () => {
  return (
    <NextUINavbar maxWidth="xl" style={{ position: "fixed" }}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* LOGO */}
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image alt="logo" height={30} src="/logo.png" width={30} />
          </NextLink>

          <NavbarItem>
            <Button color="secondary" size="sm" variant="bordered">
              Exchange LAB02
            </Button>
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
