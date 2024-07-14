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
  import { ref, watch } from 'vue';
  import { useWriteContract } from '@wagmi/vue';
  import { Card, message } from 'ant-design-vue';
  import { columns } from './columns';
  import { wagmiContractConfig } from './contracts.ts';
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

  const needHandleResult = ref('');

  watch(needHandleResult, (newVal: any) => {
    if (newVal) {
      console.log(newVal, 'xxxxx 需要请求结果');
      writeContract({
        ...wagmiContractConfig,
        functionName: 'handleResult',
        args: [newVal],
      });
    }
  });

  watch(hash, (newVal: any) => {
    if (newVal) {
      console.log(newVal, 'newVal');
      // nfts = newVal.value;
    }
  });

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

        if (record.stake_status >= 4 && !record.stake_result) {
          actions.push({
            label: '结算',
            onClick: async ({ record }) => {
              try {
                const res = await Api.stakeService.handleResult({ stakeId: record.stake_id });
                console.log(res, 'res');
              } catch (error) {
                $message.error({ content: '结算失败' });
              }

              needHandleResult.value = record.stake_id;

              loadData({ page: 1, pageSize: 10 });
            },
          });
        }

        // actions.push({
        //   label: '删除'
        // })
        return actions;
      },
    },
  ];
  const loadData = async (params): Promise<API.TableListResult> => {
    await waitTime(500);
    const res = await Api.stakeService.getStakeService({ ...params, status: -1 });
    // 手动设置搜索表单的搜索项
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
