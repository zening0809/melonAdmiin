<template>
  <div>
    <Card title="查询表单基本使用示例" style="margin-top: 20px">
      <DynamicTable
        size="small"
        bordered
        :data-request="loadData"
        :columns="columns"
        row-key="id"
        @resize-column="handleResizeColumn"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            {{ record.name }}
          </template>
        </template>

        <template #toolbar>
          <a-button type="primary" @click="addTag()"> 新增 </a-button>
        </template>
      </DynamicTable>
    </Card>

    <a-modal v-model:open="visible" title="Basic Drawer" @ok="onOk">
      <a-form ref="modalFormRef" v-bind="layout" :model="modalFormState" name="userForm">
        <a-form-item name="content" label="topic名称" :rules="[{ required: true }]">
          <a-input v-model:value="modalFormState.content" />
        </a-form-item>
        <!--            <a-form-item name="status" label="公开状态" :rules="[{ required: true }]">-->
        <!--              <a-switch :checkedValue="1" :unCheckedValue="0" v-model:checked="modalFormState.status" />-->
        <!--            </a-form-item>-->
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { columns } from './columns';
  import type { FormInstance } from 'ant-design-vue';
  import { useTable } from '@/components/core/dynamic-table';
  import { waitTime } from '@/utils/common';
  import Api from '@/api/';
  interface UserType {
    content: string;
    status: number;
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const modalFormState = ref<UserType>({
    content: '',
    // millId: 0,
  });
  const [DynamicTable, dynamicTableInstance] = useTable();
  const visible = ref(false);
  const modalFormRef = ref<FormInstance>();

  const loadData = async (params): Promise<API.TableListResult> => {
    const res = await Api.tagService.getTopicsService(params);
    await waitTime(500);
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

  const addTag = () => {
    visible.value = true;
  };

  const onOk = () => {
    modalFormRef.value.validateFields().then(() => {
      Api.tagService.createTopicService({ ...modalFormState.value }).then(() => {
        loadData({ page: 1, pageSize: 10 });
      });
      visible.value = false;
    });
  };
</script>

<style lang="less" scoped></style>
