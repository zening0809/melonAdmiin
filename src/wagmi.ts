import { http, createConfig, createStorage } from '@wagmi/vue';
import { mainnet, optimism, sepolia, zkSyncSepoliaTestnet } from '@wagmi/vue/chains';

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, zkSyncSepoliaTestnet],
  connectors: [],
  storage: createStorage({ storage: localStorage, key: 'vite-vue' }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [zkSyncSepoliaTestnet.id]: http(),
  },
});

declare module '@wagmi/vue' {
  interface Register {
    config: typeof config;
  }
}
