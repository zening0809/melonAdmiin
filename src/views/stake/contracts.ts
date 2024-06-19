export const wagmiContractConfig = {
  address: '0x9Fe47058CC28eD2D4927Bd501076277665f64A7C',
  abi: [
    {
      inputs: [{ internalType: 'uint256', name: 'proposalId', type: 'uint256' }],
      name: 'handleResult',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
} as const;
