<template>
  <div>
    <Card title="" style="margin-bottom: 20px">
      <a-descriptions title="基础信息">
        <a-descriptions-item label="对赌ID">Zhou Maomao</a-descriptions-item>
        <a-descriptions-item label="状态">1810000000</a-descriptions-item>
        <a-descriptions-item label="对赌内容">Hangzhou, Zhejiang</a-descriptions-item>
        <a-descriptions-item label="发起时间">empty</a-descriptions-item>
        <a-descriptions-item label="关联帖子">
          No. 18, Wantang Road,
        </a-descriptions-item>
        <a-descriptions-item label="结束时间">
          No. 18, Wantang Road,
        </a-descriptions-item>
      </a-descriptions>
    </Card>
    <Card title="" style="margin-bottom: 20px">
      <a-descriptions title="投票信息">
        <a-descriptions-item label="总投票人数">Zhou Maomao</a-descriptions-item>
        <a-descriptions-item label="选项1">1810000000</a-descriptions-item>
        <a-descriptions-item label="选项2">Hangzhou, Zhejiang</a-descriptions-item>
        <a-descriptions-item label="总质押数">empty</a-descriptions-item>
        <a-descriptions-item label="选项1投票数">
          No. 18,
        </a-descriptions-item>
        <a-descriptions-item label="选项2投票数">
          No. 18,
        </a-descriptions-item>
        <a-descriptions-item label="发起人奖励">
          No. 18,
        </a-descriptions-item>
      </a-descriptions>
    </Card>
    <Card title="" style="">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="投票明细">
          <VoteTable></VoteTable>
        </a-tab-pane>
        <a-tab-pane key="2" tab="评审明细" force-render>
          <ReviewTable></ReviewTable>
        </a-tab-pane>
      </a-tabs>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { Card} from 'ant-design-vue';
import { ref } from 'vue';
import VoteTable from "@/views/stake/components/VoteTable.vue";
import ReviewTable from "@/views/stake/components/ReviewTable.vue";
const activeKey = ref('1');
</script>

<style scoped>

</style>
