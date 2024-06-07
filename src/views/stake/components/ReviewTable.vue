<template>
  <DynamicTable
      ref="dynamicTableRef"
      size="small"
      :search="false"
      :showToolBar="false"
      bordered
      :data-source="props.list"
      :columns="columns2"
      row-key="heroid"
      @toggle-advanced="toggleAdvanced"
  >
  </DynamicTable>
</template>

<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { columns ,columns2} from './columns';
  import { useTable } from '@/components/core/dynamic-table';
  import { jsonToSheetXlsx } from '@/components/basic/excel';

  import { getWzryHeroList } from '@/api/demo/hero';
  const props = defineProps(['list'])
  console.log('props:',props)
  const [DynamicTable, dynamicTableInstance] = useTable();

  function defaultHeader() {
    // 默认Object.keys(data[0])作为header
    jsonToSheetXlsx({
      data: dynamicTableInstance.tableData,
      filename: '使用key作为默认头部.xlsx',
    });
  }

  // 自定义头部
  function customHeader() {
    jsonToSheetXlsx({
      data: dynamicTableInstance.tableData,
      header: {
        heroid: 'ID',
        cname: '英雄名称',
        title: '英雄称号',
        occupation: '定位',
        skin_name: '皮肤',
      },
      filename: '自定义头部.xlsx',
      json2sheetOpts: {
        // 指定顺序
        header: ['cname', 'heroid'],
      },
    });
  }

  // 展开搜索表单时更新英雄皮肤选项值
  const toggleAdvanced = (e) => {
    if (e) {
      //dynamicTableInstance?.getQueryFormRef().updateSchema([
      //   {
      //     field: 'skin_name',
      //     componentProps: {
      //       options: [
      //         {
      //           label: '皮肤1',
      //           value: 'aa',
      //         },
      //         {
      //           label: '皮肤2',
      //           value: 'bb',
      //         },
      //       ],
      //     },
      //   },
      // ]);
    }
  };
</script>

<style lang="less" scoped></style>
