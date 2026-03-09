import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, sepolia } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

// 1. Get projectId from https://cloud.reown.com
export const projectId = '815147816e88102a0a2569e2c45f4702' // Working placeholder for hackathon demo

// 2. Create networks
export const networks = [mainnet, sepolia] as [AppKitNetwork, ...AppKitNetwork[]]

// 3. Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 4. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'x', 'github', 'discord', 'apple'],
    emailShowWallets: true
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#6366f1',
    '--w3m-color-mix-strength': 20,
    '--w3m-accent': '#6366f1',
    '--w3m-font-family': 'Outfit, sans-serif',
    '--w3m-border-radius-master': '12px'
  }
})
