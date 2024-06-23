import type { TableColumn } from '@/components/core/dynamic-table';
import { waitTime } from '@/utils/common';
import { useDictStore } from '@/store/modules/dict';
import { formatToDateTime } from '@/utils/dateUtil';

const names = ['王路飞', '王大蛇', '李白', '刺客伍六七'];
const { fetchDict } = useDictStore();

export const fetchStatusMapData = async (keyword = '') => {
  const [data] = await fetchDict('sell_status');
  return waitTime<LabelValueOptions>(
    100,
    data.filter((n) => n.label.includes(keyword)),
  );
};

export const getClothesByGender = (gender: number) => {
  if (gender === 1) {
    // 男
    return [
      {
        label: '西装',
        value: 1,
      },
      {
        label: '领带',
        value: 0,
      },
    ];
  } else if (gender === 0) {
    //女
    return [
      {
        label: '裙子',
        value: 1,
      },
      {
        label: '包包',
        value: 0,
      },
    ];
  }
  return [];
};

export const tableData = Array.from({ length: 30 }).map((_, i) => {
  const gender = ~~(Math.random() * 2);
  return {
    id: i + 1,
    date: new Date().toLocaleString(),
    name: names[~~(Math.random() * 4)],
    clothes: getClothesByGender(gender)[~~(Math.random() * 2)].label,
    price: ~~(Math.random() * 1000),
    gender,
    img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    status: ~~(Math.random() * 2),
    nested: {
      prop: `嵌套属性 ${i + 1}`,
    },
  };
});

// 数据项类型
export type ListItemType = (typeof tableData)[number];
// 使用TableColumn<ListItemType> 将会限制dataIndex的类型，但换来的是dataIndex有类型提示
export const columns: TableColumn<ListItemType>[] = [
  {
    title: '活动ID',
    dataIndex: 'id',
    // sorter: true,
    width: 60,
    hideInSearch: true,
  },
  {
    title: '活动名称',
    dataIndex: 'name',
    hideInSearch: true,
  },
  {
    title: '活动状态',
    dataIndex: 'stake_status',
    customRender: ({ record }) => {
      return record.status == 1 ? '进行中' : '已结束';
    },
  },
  {
    title: '过期时间',
    dataIndex: 'expireAt',
    hideInSearch: true,
    customRender: ({ record }) => formatToDateTime(record.expireAt),
  },
  {
    title: '发起时间',
    dataIndex: 'createdAt',
    hideInSearch: true,
    customRender: ({ record }) => formatToDateTime(record.createdAt),
  },
];
