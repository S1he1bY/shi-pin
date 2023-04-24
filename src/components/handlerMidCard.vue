<template>
    <div class="card">
      <router-link :to="{
        path:'/play',
        query:{
          id:item.children[0].model.resource.id
        }
      }" 
      v-for="(item, index) in midList" :key="index">
        <div class="card-item">
          <div class="card-img">
            <img :src="item.children[0].model.resource.cover" alt="" />
            <div class="card-info">
              <div class="watch">
                <span class="iconfont icon-zhiboguankanshu"></span>{{ formatWatch(item.children[0].model.resource.count.count_view) }}
              </div>
              <div class="like">
                <span class="iconfont icon-dianzan"></span>{{ item.children[0].model.resource.count.count_like }}
              </div>
              <div class="time">{{ formatTime(item.children[0].model.resource.duration) }}</div>
            </div>
          </div>
          <div class="card-title">
            {{ item.children[0].model.resource.title }}
          </div>
          <div class="card-more"><span class="iconfont icon-gengduo-shuxiang"></span></div>
        </div>
      </router-link>
    </div>
</template>
  
<script setup>
import { formatWatch,formatTime } from '../utils/utils'
const props = defineProps({
    midList:Array
})
</script>
  
<style scoped>
  .card{
  display: flex;
  flex-wrap: wrap;
  justify-content:space-evenly;
  background-color: rgba(247,247,247);
}
.card-item{
  width: 172px;
  height: 184px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 5px;
  margin-top: 8px;
}
.card-img {
  width: 100%;
  position: relative;
}
.card-img img {
  width: 172px;
  height: 96px;
}
.card-info {
  width: 90%;
  position: absolute;
  bottom: 10px;
  left: 8px;
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: space-between;
}

.card-title{
  font-size: 14px;
  padding: 5px 10px 3px 11px;
  line-height: 20px;
  height: 40px;
  color: black;
  /* 多行文本溢出变成省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
}
.icon-zhiboguankanshu,
.icon-dianzan {
  font-size: 12px;
}
.card-more{
  width: 96%;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row-reverse;
}
.icon-gengduo-shuxiang{
  font-size: 20px;
  color: #979797;
 
}

</style>