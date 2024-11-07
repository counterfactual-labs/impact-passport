"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia, hardhat } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { PropsWithChildren } from "react";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [baseSepolia, hardhat],
    transports: {
      // RPC URL for each chain
      [hardhat.id]: http(`http://localhost:8545`),
      [baseSepolia.id]: http(
        `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required App Info
    appName: "Atoll",

    // Optional App Info
    appDescription:
      "Atoll is a Kickstarter for pop-up cities and network states, enabling communities to collectively fund projects, events, and initiatives.",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
