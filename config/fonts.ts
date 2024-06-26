import {
  Fira_Code as FontMono,
  Montserrat as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
