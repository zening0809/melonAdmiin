<template>
  <div>
    <Card title="投票管理" style="margin-top: 20px">
      <DynamicTable
        size="small"
        bordered
        :data-request="loadData"
        :columns="columns2"
        row-key="id"
        @resize-column="handleResizeColumn"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            {{ record.name }}
          </template>
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { useWriteContract } from '@wagmi/vue';
  import { Card, message } from 'ant-design-vue';
  import { columns } from './columns';
  import { useTable } from '@/components/core/dynamic-table';
  import { waitTime } from '@/utils/common';
  import Api from '@/api/';
  import { useFormModal } from '@/hooks/useModal';
  // import { SignIn  } from 'vue-clerk'
  import router from '@/router';
  const [DynamicTable, dynamicTableInstance] = useTable();
  const [showModal] = useFormModal();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
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
  const columns2 = [
    ...columns,
    {
      title: '操作',
      dataIndex: 'ACTION',
      width: 200,
      actions: ({ record }) => {
        const actions = [];
        actions.push({
          label: '详情',
          onClick({ record }) {
            console.log('record', record);
            router.push(`/nft/detail/${record.id}`);
          },
        });
        return actions;
      },
    },
  ];
  const loadData = async (params): Promise<API.TableListResult> => {
    console.log('params', params);
    await waitTime(500);
    const res = await Api.nftService.getNftActivityListService({ ...params });
    console.log('res：', res);

    return {
      ...params,
      items: res.items,
    };
  };

  const handleResizeColumn = (w, col) => {
    // console.log('w', w, col);
    col.width = w;
  };
</script>

<style lang="less" scoped></style>
