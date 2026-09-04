import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ribaal — Sherwanis made to be remembered",
    template: "%s · Ribaal",
  },
  description:
    "A cinematic editorial storefront for hand-finished Indian ceremonial menswear.",
  metadataBase: new URL("https://Ribaal.example"),
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
        alt: "An ivory embroidered sherwani in a deep green editorial setting",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
