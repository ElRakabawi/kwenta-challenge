"use client"
import StyledComponentsRegistry from "./lib/registry"
import "./globals.css"

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { optimism } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
 
const { publicClient, webSocketPublicClient } = configureChains(
    [optimism],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string }),
        publicProvider()
    ],
)
 
const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
})

export default function RootLayout({
    children,
} : {
    children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body>
            <WagmiConfig config={config}>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </WagmiConfig>
        </body>
    </html>
  );
}
