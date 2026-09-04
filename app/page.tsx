import type { Metadata } from "next";
import { RybelHome } from "./RybelHome";

export const metadata: Metadata = {
  title: "Rybel — Sherwanis made to be remembered",
  description:
    "Discover Rybel's ceremonial sherwanis, shaped by patient hands and made for the moments that become memory.",
  openGraph: {
    title: "Rybel — The Ceremonial Edit",
    description:
      "Hand-finished sherwanis with a modern point of view and an heirloom soul.",
    type: "website",
    images: [
      {
        url: "/rybel/hero-sherwani.png",
        width: 1672,
        height: 941,
        alt: "A Rybel ivory embroidered sherwani in a deep green editorial setting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rybel — The Ceremonial Edit",
    description: "Sherwanis made slowly, for moments remembered forever.",
    images: ["/rybel/hero-sherwani.png"],
  },
};

export default function Home() {
  return <RybelHome />;
}
