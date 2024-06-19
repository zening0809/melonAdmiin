<template>
  <ProConfigProvider>
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
    <LockScreen />
  </ProConfigProvider>
</template>

<script setup lang="ts">
  import { useChainId, useConnect } from '@wagmi/vue';
  import { LockScreen } from '@/components/basic/lockscreen';

  const chainId = useChainId();
  const { connect, connectors, error, status } = useConnect();

  console.log(status, 'status');

  if (status !== 'connected') {
    for (const connector of connectors) {
      connect({ connector, chainId });
    }
    console.log('connected', connectors);
  }
</script>
