<template>
  <div>
    <!-- v-model:active="active" -->
    <van-tabs  color="red" sticky title-inactive-color="#bbbbbb">
      <van-tab title="推荐">
        <Recommend/>
      </van-tab>
      <van-tab title="每日精选">
        <Selection/>
      </van-tab>
      <van-tab title="热门">
        <Hot/>
      </van-tab>
      <van-tab title="剧情短片">
        <ShortVideo/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import Recommend from '../components/HomeTab/RecommendView.vue'
import Selection from '../components/HomeTab/SelectionView.vue'
import Hot from '../components/HomeTab/HotView.vue'
import ShortVideo from '../components/HomeTab/ShortVideo.vue';
</script>

<style scoped lang="less">
/deep/ .van-tab__text {
  font-weight: 700 ;
}
</style>