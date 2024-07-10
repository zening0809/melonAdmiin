import { Tag, Image } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

export const columns: TableColumn[] = [
  {
    title: '用户ID',
    width: 100,
    hideInSearch: true,
    dataIndex: 'user_id',
  },
  {
    title: '用户名称',
    dataIndex: 'user_name',
    hideInSearch: true,
  },
  {
    title: '投票项',
    dataIndex: 'vote_option',
    hideInSearch: true,
    customRender: ({record}) =>  {
      const v = record.opMap[record.vote_option]

      return v
    }
  },
  // {
  //   title: '理由',
  //   dataIndex: 'user_remark',
  //   hideInSearch: true,
  // },
  {
    title: '陪审轮次',
    dataIndex: 'skin_name',
    hideInSearch: true,

    customRender: ({ record }) => (
      '1'
    ),
  },
    //
    // {
    //   title: '状态',
    //   dataIndex: 'vote_status',
    //   hideInSearch: true,
    //   customRender: ({record}) => {
    //     return record.vote_status = 1 ? '' : ''
    //   }
    // },

];
export const columns2: TableColumn[] = [
  {
    title: '用户ID',
    width: 100,
    hideInSearch: true,
    dataIndex: 'user_id',
  },
  {
    title: '用户名称',
    dataIndex: 'user_name',
    hideInSearch: true,
  },
  {
    title: '投票项',
    dataIndex: 'review_option',
    hideInSearch: true,
    customRender: ({record}) =>  {
      const v = record.opMap[record.review_option]

      return v
    }
  },
  // {
  //   title: '理由',
  //   dataIndex: 'reason',
  //   hideInSearch: true,
  // },
  {
    title: '陪审轮次',
    dataIndex: 'skin_name',
    hideInSearch: true,

    customRender: ({ record }) => (
        '1'
    ),
  },

  {
    title: '状态',
    dataIndex: 'review_status',
    hideInSearch: true,
    customRender: ({record}) => {
      return record.review_status === 1 ? '待陪审' : record.review_status === 2  ? '已陪审' :  ''
    }
  },

];
