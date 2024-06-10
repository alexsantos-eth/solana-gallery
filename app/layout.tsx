import "@/styles/globals.css";

import clsx from "clsx";
import React from "react";

import { fontSans } from "@/config/fonts";
import { Navbar } from "@/layout/components/Navbar";
import Providers from "@/providers/NextUI";
import { Link } from "@nextui-org/link";

interface RootLayoutProps {
  children: React.ReactNode;
}
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />

            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>

            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://github.com/RebelCoderz"
                title="Powered by RebelCoderz"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">RebelCoderz</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
