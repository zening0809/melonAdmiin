export const wagmiContractConfig = {
  address: '0x301Eb05d6ce626eb23Cf5528882Da20F2F520347',
  abi: [
    {
      inputs: [],
      name: 'getAllCommonNFTs',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'uint256', name: 'price', type: 'uint256' },
            { internalType: 'string', name: 'uri', type: 'string' },
            { internalType: 'uint256', name: 'gainTime', type: 'uint256' },
          ],
          internalType: 'struct JuryNFTSwap.NFTListInfo[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getAllStartUpNFTs',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'uint256', name: 'price', type: 'uint256' },
            { internalType: 'string', name: 'uri', type: 'string' },
            { internalType: 'uint256', name: 'gainTime', type: 'uint256' },
          ],
          internalType: 'struct JuryNFTSwap.NFTListInfo[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'contract Proposal', name: 'proposal', type: 'address' },
      ],
      name: 'purchaseCommonNFT',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
      name: 'getUserNFTHolding',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'uint256', name: 'price', type: 'uint256' },
            { internalType: 'string', name: 'uri', type: 'string' },
            { internalType: 'uint256', name: 'gainTime', type: 'uint256' },
          ],
          internalType: 'struct JuryNFTSwap.NFTListInfo',
          name: '',
          type: 'tuple',
        },
        {
          components: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'uint256', name: 'price', type: 'uint256' },
            { internalType: 'string', name: 'uri', type: 'string' },
            { internalType: 'uint256', name: 'gainTime', type: 'uint256' },
          ],
          internalType: 'struct JuryNFTSwap.NFTListInfo[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTotalApplyInfo',
      outputs: [
        { internalType: 'uint256', name: 'totalApplicants', type: 'uint256' },
        { internalType: 'uint256', name: 'totalPledgedAmount', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'pledgeAmount', type: 'uint256' }],
      name: 'applyStartUpNFT',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
} as const;

export const distributeNft = {
  address: '0x301Eb05d6ce626eb23Cf5528882Da20F2F520347',
  abi: [
    {
      inputs: [
        { internalType: 'address[]', name: 'users', type: 'address[]' },
        { internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' },
      ],
      name: 'distributeStartUpNFT',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
} as const;
