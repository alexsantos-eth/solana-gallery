import NextLink from "next/link";
import React from "react";
import { GitHub } from "react-feather";

import ThemeSwitch from "@/components/ThemeSwitch";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { getUnit } from "@/layout/utils";

export const Navbar: React.FC = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* LOGO */}
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <p className="font-bold text-xl">👽</p>
            <p
              style={{
                color: "hsl(var(--nextui-default-700))",
                fontWeight: "bold",
              }}
            >
              RebelGallery
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* LINKS */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem>
          <WalletMultiButton />
        </NavbarItem>

        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GitHub className="text-default-500" size={20} />
          </Link>

          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* DESKTOP */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarItem>
          <WalletMultiButton />
        </NavbarItem>

        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GitHub className="text-default-500" size={20} />
        </Link>
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
