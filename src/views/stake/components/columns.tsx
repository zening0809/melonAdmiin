import { Tag, Image } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

export const columns: TableColumn[] = [
  {
    title: '头像',
    width: 100,
    hideInSearch: true,
    dataIndex: 'faceimg',
    customRender: ({ record }) => (
      <Image src={record.faceimg} preview={{ src: record.heroimg }} key={record.faceimg}></Image>
    ),
  },
  {
    title: '英雄名称',
    dataIndex: 'cname',
    hideInSearch: true,
  },
  {
    title: '英雄称号',
    dataIndex: 'title',
    hideInSearch: true,
  },
  {
    title: '定位',
    dataIndex: 'occupation',
    hideInSearch: true,
  },
  {
    title: '皮肤',
    dataIndex: 'skin_name',
    hideInSearch: true,
    formItemProps: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '皮肤1',
            value: 'aa',
          },
          {
            label: '皮肤2',
            value: 'bb',
          },
        ],
      },
    },
    customRender: ({ record }) => (
      <div>
        {record.skin_name?.split('|')?.map((name) => (
          <Tag color={'blue'} key={name}>
            {name}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: '操作',
    width: 120,
    dataIndex: 'ACTION',
    hideInSearch: true,
    actions: ({ record }) => [
      {
        label: '查看详情',
        onClick: () => window.open(record.infourl),
      },
    ],
  },
];
