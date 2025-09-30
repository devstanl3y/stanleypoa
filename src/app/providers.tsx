'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, metaMask, walletConnect } from 'wagmi/connectors';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const network = process.env.NEXT_PUBLIC_NETWORK || 'mainnet';

const mainnetRpcUrl = process.env.NEXT_PUBLIC_BASE_MAINNET_RPC_URL!;
const mainnetPaymasterUrl = process.env.NEXT_PUBLIC_MAINNET_PAYMASTER_URL!;
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL;
const sepoliaPaymasterUrl = process.env.NEXT_PUBLIC_SEPOLIA_PAYMASTER_URL;

const cdpProjectId = process.env.NEXT_PUBLIC_CDP_PROJECT_ID!;
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

const isMainnet = network === 'mainnet';
const activeChain = isMainnet ? base : baseSepolia;
const activePaymasterUrl = isMainnet ? mainnetPaymasterUrl : sepoliaPaymasterUrl!;
const activeSepoliaRpcUrl = sepoliaRpcUrl || '';

if (!cdpProjectId || !walletConnectProjectId || !mainnetRpcUrl || !mainnetPaymasterUrl) {
  throw new Error(`Missing required mainnet environment variables for ${network}.`);
}

const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({ appName: 'StanleyPOA Minter', version: '4' }),
    injected(),
    metaMask(),
    walletConnect({ projectId: walletConnectProjectId }),
  ],
  transports: {
    [base.id]: http(mainnetRpcUrl),
    [baseSepolia.id]: http(activeSepoliaRpcUrl),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={cdpProjectId}
          chain={activeChain}
          config={{ paymaster: activePaymasterUrl }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}