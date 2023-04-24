<template>
  <div class="video-similar">
    

      <div class="similar-box" v-for="(item, index) in List" :key="index" @click="toSimilar(item.id)">
        <div class="similar-bigimg">
          <img :src="item.cover" alt="" />
          <div class="similar-time">{{ formatTime(item.duration) }}</div>
        </div>
        <div class="similar-info">
          <h4 v-if="item.share_info">{{ item.share_info.title }}</h4>
          <h4 v-else>{{ item.title }}</h4>
          <p>
            播放 {{ formatWatch(item.count.count_view) }} · 喜欢
            {{ item.count.count_like }}
          </p>
          <div class="similar-author">
            <div class="pics">
              <div class="img1">
                <img :src="item.author.userinfo.avatar" alt="" />
              </div>
              <div class="img2" v-if="item.team.length > 0">
                <img :src="item.team[0].userinfo.avatar" alt="" />
              </div>
              <div class="img3" v-if="item.team.length > 1">
                <img :src="item.team[1].userinfo.avatar" alt="" />
              </div>
            </div>
            <div class="all">
              <span class="firstname" v-if="item.team.userinfo">
                {{ item.team.userinfo.username }}
              </span>
              <span class="firstname" v-else>{{
                item.author.userinfo.username
              }}</span>
              <span v-if="item.team.length > 0">等{{ item.team.length }}位创作人</span>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup>
// import { reactive, ref, onMounted } from "vue";
import { watch } from "vue";
import { formatWatch, formatTime, formateDate } from "../../utils/utils";
import { useRoute, useRouter } from "vue-router";
const props = defineProps({
  List: Array,
});

const route = useRoute();
const router = useRouter();


// 相似视频跳转
const toSimilar = (id)=>{
  console.log('相似视频id',id);
  router.push({
    path: '/play',
    query: {
      id: id,
    },
  })
  // .then(()=>{
  //   router.go(0)
  // })
}


</script>

<style scoped lang="less">
.video-similar {
  .similar-title {
    height: 45px;
    line-height: 45px;
    margin-left: 20px;
    margin-top: 15px;
    font-size: 15px;
    font-weight: 700;
  }

  .similar-box {
    padding: 0 15px;
    display: flex;
    padding-bottom: 16px;

    .similar-bigimg {
      width: 160px;
      height: 90px;
      // border-radius: 5px;
      position: relative;
      box-shadow: 0 4px 4px 0 #ddd;

      // overflow: hidden;
      img {
        width: 160px;
        height: 90px;
        border-radius: 5px;
      }

      .similar-time {
        position: absolute;
        right: 8px;
        bottom: 0;
        line-height: 27px;
        font-size: 12px;
        color: #fff;
      }
    }

    .similar-info {
      flex: 1;
      padding-left: 12px;

      h4 {
        font-size: 13px;
        line-height: 19px;
        font-weight: 700;
      }

      p {
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: #b0b0b0;
      }

      .similar-author {
        height: 20px;
        display: flex;

        .pics {
          width: 36px;
          height: 20px;
          position: relative;

          img {
            width: 16px;
            height: 16px;
            border-radius: 10px;
            border: 2px solid #fff;
          }

          .img1 {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
          }

          .img2 {
            position: absolute;
            left: 8px;
            top: 0;
            z-index: 2;
          }

          .img3 {
            position: absolute;
            left: 16px;
            top: 0;
            z-index: 1;
          }
        }

        .all {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          margin-left: 6px;
          color: #6b6b6b;
          display: flex;
          align-items: center;

          .firstname {
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            display: inline-block;
            width: 55px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}</style>