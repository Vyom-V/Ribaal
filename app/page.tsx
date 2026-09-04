import type { Metadata } from "next";
import { RibaalHome } from "./RibaalHome";

export const metadata: Metadata = {
  title: "Ribaal — Sherwanis made to be remembered",
  description:
    "Discover Ribaal's ceremonial sherwanis, shaped by patient hands and made for the moments that become memory.",
  openGraph: {
    title: "Ribaal — The Ceremonial Edit",
    description:
      "Hand-finished sherwanis with a modern point of view and an heirloom soul.",
    type: "website",
    images: [
      {
        url: "/ribaal/hero-sherwani.png",
        width: 1672,
        height: 941,
        alt: "A Ribaal ivory embroidered sherwani in a deep green editorial setting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ribaal — The Ceremonial Edit",
    description: "Sherwanis made slowly, for moments remembered forever.",
    images: ["/ribaal/hero-sherwani.png"],
  },
};

export default function Home() {
  return <RibaalHome />;
}
