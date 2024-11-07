import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Web3Provider } from "./providers";
import { Header } from "./header";

export const metadata: Metadata = {
  title: "Impact Passport",
  description: "...",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Web3Provider>
            <main className="mx-auto max-w-screen-lg">
              <Header />
              {children}
            </main>
          </Web3Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
