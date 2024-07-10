<template>
  <div>
    <Card title="" style="margin-bottom: 20px">
      <template v-if="stake?.status === 2" #extra>
        <a-popover v-model:open="visible" title="确认通过？" trigger="click">
          <template #content>
            <a @click="ok()">确认</a>
          </template>
          <a-button type="primary">通过</a-button>
        </a-popover>
        <a-popover v-model:open="visible2" title="确认不通过？" trigger="click">
          <template #content>
            <a @click="ok2()">确认</a>
          </template>
          <a-button type="primary" style="margin-left: 20px">不通过</a-button>
        </a-popover>
      </template>
      <a-descriptions title="基础信息">
        <a-descriptions-item label="提案ID">{{ stake?.stakeId || '-' }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          stakeStatusMap[stake?.status] || '-'
        }}</a-descriptions-item>
        <a-descriptions-item label="提案内容">{{ stake?.content || '-' }}</a-descriptions-item>
        <a-descriptions-item label="发起时间">{{
          format(stake?.created_at) || '-'
        }}</a-descriptions-item>
        <a-descriptions-item label="关联帖子">
          {{ post?.title || '-' }}
        </a-descriptions-item>
        <a-descriptions-item label="结束时间">
          {{ format(stake?.expiredAt) }}
        </a-descriptions-item>
      </a-descriptions>
    </Card>
    <Card title="" style="margin-bottom: 20px">
      <a-descriptions title="投票信息">
        <a-descriptions-item label="总投票人数">{{ voteCount }}</a-descriptions-item>
        <a-descriptions-item label="选项1">{{ stake?.option1 }}</a-descriptions-item>
        <a-descriptions-item label="选项2">{{ stake?.option2 }}</a-descriptions-item>
        <a-descriptions-item label="总质押数">-</a-descriptions-item>
        <a-descriptions-item label="选项1投票数"> - </a-descriptions-item>
        <a-descriptions-item label="选项2投票数"> - </a-descriptions-item>
        <a-descriptions-item label="发起人奖励"> - </a-descriptions-item>
      </a-descriptions>
    </Card>
    <Card title="" style="">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="投票明细">
          <VoteTable :count="voteCount" :list="voteList" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="评审明细" force-render>
          <ReviewTable :count="psCount" :list="psList" />
        </a-tab-pane>
      </a-tabs>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Card, message } from 'ant-design-vue';
  import VoteTable from '@/views/stake/components/VoteTable.vue';
  import ReviewTable from '@/views/stake/components/ReviewTable.vue';
  import {
    getPostByOneService,
    getReviewDetailService,
    getStakeByOneService,
    getVoteDetailService,
  } from '@/api/backend/api/stake';
  import { formatToDateTime } from '@/utils/dateUtil';
  import Api from '@/api/';
  const route = useRoute();
  const activeKey = ref('1');
  const stake = ref(null);
  const post = ref(null);
  const visible = ref(false);
  const visible2 = ref(false);
  const voteList = ref([]);
  const psList = ref([]);
  const psCount = ref(0);
  const voteCount = ref(0);
  const stakeStatusMap = {
    1: '待审批',
    2: '通过',
    3: '拒绝',
    4: '陪审中',
    5: '陪审结束',
    6: '完结',
  };

  onMounted(() => {
    loadData();
  });
  const loadData = () => {
    getStake();
    getPost();
  };
  const ok = () => {
    console.log('通过:');
    Api.stakeService.changeStakeService({ stakeId: stake.value.stakeId, status: 2 }).then((res) => {
      console.log('res:', res);
      message.success('审批通过，操作成功');
      loadData();
      visible.value = false;
    });
  };
  const format = (date) => {
    return formatToDateTime(new Date(date));
  };

  const ok2 = () => {
    console.log('通过:');
    Api.stakeService.changeStakeService({ stakeId: stake.value.stakeId, status: 3 }).then((res) => {
      console.log('res:', res);
      message.success('审批不通过，操作成功');
      loadData();
      visible2.value = false;
    });
  };
  const getStake = () => {
    getStakeByOneService({
      postId: route.params.id,
    }).then((resp: any) => {
      console.log(resp);
      stake.value = resp;
      const option = {
        0: resp.option1,
        1: resp.option2
      }
      getVote(resp.id, option);
      getPs(resp.id, option);
    });
  };
  const getPost = () => {
    getPostByOneService({ id: route.params.id }).then((resp) => {
      console.log(resp);
      post.value = resp;
    });
  };
  const getVote = (stakeId: number, opMap = {}) => {
    getVoteDetailService({
      stakeId: stakeId,
    }).then((resp: any) => {
      // console.log('vote:', resp);
      voteCount.value = resp.voteCount;
      voteList.value = resp.voteUsers?.map(vu => {
        vu.opMap = opMap
        return vu
      });
    });
  };
  const getPs = (stakeId: number, opMap = {}) => {
    getReviewDetailService({
      stakeId: stakeId,
    }).then((resp: any) => {
      // console.log('ps:', resp);
      psCount.value = resp.reviewCount;
      psList.value = resp.reviewUsers.map(vu => {
        vu.opMap = opMap
        return vu
      });
    });
  };
</script>

<style scoped></style>
