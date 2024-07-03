<template>
  <div>
    <Card title="投票管理" style="margin-top: 20px">
      <DynamicTable
        size="small"
        bordered
        :data-request="loadData"
        :columns="columns2"
        row-key="id"
        :search="false"
        @resize-column="handleResizeColumn"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            {{ record.name }}
          </template>
        </template>
        <template #toolbar>
          <a-button type="primary" @click="pickUser"> 抽取初创NFT </a-button>
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, watch } from 'vue';
  import { useReadContract, useWriteContract } from '@wagmi/vue';
  import { useRoute } from 'vue-router';
  import { Card, message } from 'ant-design-vue';
  import { columns } from './detail-columns';
  import { wagmiContractConfig, distributeNft } from './contracts.ts';
  import { useTable } from '@/components/core/dynamic-table';
  import Api from '@/api/';
  import { useFormModal } from '@/hooks/useModal';
  const { data: distributeData, writeContract } = useWriteContract();
  const [DynamicTable, dynamicTableInstance] = useTable();
  const [showModal] = useFormModal();

  const PICK_NUM = 1;
  let userList = reactive([]);
  let nfts = reactive([]);
  let pickResult = reactive({});
  const openMenuModal = async (record: any, text = '', type: 'Y' | 'N' = 'Y') => {
    const [formRef] = await showModal({
      modalProps: {
        title: text,
        width: '50%',
        onFinish: async (values) => {
          if (type === 'Y') {
            const res = await Api.stakeService.changeStakeService({
              stakeId: record.stake_id,
              status: 2,
            });
            console.log('res:', res);
            message.success('审批通过');
          } else {
            const res = await Api.stakeService.changeStakeService({
              stakeId: record.stake_id,
              status: 3,
            });
            message.success('审批不通过');
          }

          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 120,
        schemas: [],
      },
    });
    formRef?.setFieldsValue({
      ...record,
    });
  };

  function getRandomSamples<T>(array: T[], sampleSize: number): T[] {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, sampleSize);
  }

  const resConstruct = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getAllStartUpNFTs',
  });

  watch(resConstruct.data, (newVal: any) => {
    if (newVal) {
      console.log(newVal);
      for (const item of newVal) {
        nfts.push(item);
      }
      // nfts = newVal.value;
    }
  });

  watch(distributeData, (newData) => {
    if (newData) {
      console.log('Transaction successful:', newData);
      console.log('pickResult:', pickResult);
      message.success('抽取用户成功');
    }
  });

  const pickUser = () => {
    // console.log(useConfig, '---useConfig------');
    if (userList.length < PICK_NUM) {
      message.warning('用户数量不足');
    }
    // console.log(data, 'data-----------');
    const pickUsers = getRandomSamples(userList, PICK_NUM);
    const userAccounts = pickUsers.map((user) => user.user_web3Wallet);

    console.log(nfts.length);

    const tempList = new Array(nfts.length).fill(1).map((item, index) => index);
    console.log(tempList);
    const nftIndexList = getRandomSamples(tempList, PICK_NUM);

    const nftTokens = [];
    for (const i of nftIndexList) {
      nftTokens.push(nfts[i]?.tokenId);
    }
    console.log(userAccounts, 'userAccounts');
    console.log(nftTokens, 'nftTokens');

    pickResult = {
      userAccounts,
      nftTokens,
    };
    writeContract({
      ...distributeNft,
      functionName: 'distributeStartUpNFT',
      args: [userAccounts, nftTokens],
    });
  };

  const route = useRoute();

  const columns2 = [...columns];
  const loadData = async (params): Promise<API.TableListResult> => {
    const res = await Api.nftService.getNftActivityUsersService({
      id: route.params.id,
    });
    console.log('res：', res);

    userList = res;
    return {
      ...params,
      items: res,
    };
  };

  const handleResizeColumn = (w, col) => {
    // console.log('w', w, col);
    col.width = w;
  };
</script>

<style lang="less" scoped></style>
