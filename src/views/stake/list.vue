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
        <template #toolbar>
          <!--          <ClerkProvider>-->
          <!--            <SignedIn>-->
          <!--              <UserButton after-sign-out-url="https://foo.bar" />-->
          <!--            </SignedIn>-->
          <!--            <SignedOut>-->
          <!--              <SignInButton mode="modal" />-->
          <!--            </SignedOut>-->
          <!--          </ClerkProvider>-->
          <!--          <SignIn path="/sign-in" routing="path" sign-up-url="/sign-up" />-->
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { useWriteContract } from '@wagmi/vue';
  import { Card, message } from 'ant-design-vue';
  import { columns } from './columns';
  import { wagmiContractConfig } from './contracts';
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
        if (record.stake_status === 1) {
          actions.push({
            label: '通过',
            onClick() {
              openMenuModal(record, '确认通过', 'Y');
            },
          });
          actions.push({
            label: '不通过',
            onClick() {
              openMenuModal(record, '确认不通过', 'N');
            },
          });
        }

        actions.push({
          label: '详情',
          onClick({ record }) {
            console.log('record', record);
            router.push(`/stake/detail/${record.post_id}`);
          },
        });
        actions.push({
          label: '结算',
          onClick({ record }) {
            console.log('record', record);
            writeContract({
              ...wagmiContractConfig,
              functionName: 'handleResult',
              args: [0],
            });
          },
        });
        // actions.push({
        //   label: '删除'
        // })
        return actions;
      },
    },
  ];
  const loadData = async (params): Promise<API.TableListResult> => {
    console.log('params', params);
    await waitTime(500);
    const res = await Api.stakeService.getStakeService({ ...params, status: -1 });
    console.log('res：', res);
    // 手动设置搜索表单的搜索项
    dynamicTableInstance?.getQueryFormRef()?.updateSchema?.([
      {
        field: 'price',
        componentProps: {
          options: [
            {
              label: '0-199',
              value: '0-199',
            },
            {
              label: '200-999',
              value: '200-999',
            },
          ],
        },
      },
    ]);

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
