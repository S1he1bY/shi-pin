<template>
  <div class="main">
    <div class="shortVideo" v-if="ShortBool.show">
      <!-- 轮播图 -->
      <div class="short-banner">
        <van-swipe autoplay="3000">
          <van-swipe-item v-for="item in bannerShort.list">
            <img :src="item.model.cover" class="bannerImg" alt="" />
            <div class="banner-title">{{ item.model.title }}</div>
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="custom-indicator">{{ active + 1 }} / {{ total }}</div>
          </template>
        </van-swipe>
      </div>

      <div
        class="short-info"
        v-for="item in ShortData.list"
        @click="goVideo(item.children[0].model.resource.id)"
      >
        <div class="info-top">
          <div class="userinfo">
            <div class="img">
              <img
                :src="item.children[0].model.resource.author.userinfo.avatar"
                alt=""
              />
            </div>
            <p>
              {{ item.children[0].model.resource.author.userinfo.username }}
            </p>
          </div>
          <span class="iconfont icon-gengduo-shuxiang"></span>
        </div>

        <p class="text">{{ item.children[0].model.resource.title }}</p>

        <div class="text-img">
          <img :src="item.children[0].model.resource.cover" alt="" />
          <div class="img-bottom">
            {{ formatWatch(item.children[0].model.resource.count.count_view) }}
            观看 | {{ formatTime(item.children[0].model.resource.duration) }}
          </div>
        </div>

        <div class="short-info-bottom">
          <div class="collect">
            <span class="iconfont icon-shoucang"></span>
            {{ item.children[0].model.resource.count.count_collect }}
          </div>
          <div class="pinglun">
            <span class="iconfont icon-bijijilu"></span>
            {{ item.children[0].model.resource.count.count_comment }}
          </div>
          <div class="like">
            <span class="iconfont icon-dianzan"></span>
            {{ item.children[0].model.resource.count.count_like }}
          </div>
        </div>
      </div>

      <div class="blank"></div>
    </div>
  </div>
</template>

<script setup>
import { getShort } from "../../api/shortvideo";
import { useRouter } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { formatWatch, formatTime} from '../../utils/utils'

const router = useRouter();

const ShortBool = reactive({
  show: false,
});

// 轮播图
var bannerShort = reactive({
  list: [],
});

//剧情短片数据
const ShortData = reactive({
  list: [],
});

const goVideo = (id)=>{
    router.push({
        path:'/play',
        query:{
            id:id
        }
    }).then(()=>{
        router.go(0)
    })
}


onMounted(() => {
  getShort().then((res) => {
    // console.log(res);
    var data = res.data.data.children;
    console.log("剧情短片数据", data);
    // 拿到轮播图索引号
    var bannerNum = data.findIndex((item) => item.type == "uiBanner");
    bannerShort.list = data[bannerNum].children;
    console.log("轮播图数据", bannerShort.list);

    data.forEach((item) => {
      if (item.type === "uiBigCard") {
        ShortData.list.push(item);
      }
    });
    console.log("剧情短片数据", ShortData.list);

    ShortBool.show = true;
  });
});
</script>

<style lang="less" scoped>
.blank {
  height: 50px;
}
.main {
  min-width: 375px;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;

  .shortVideo {
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;

    .short-banner {
      width: 93.6%;
      height: 197px;
      margin: 0 auto;
      margin-top: 8px;
      overflow: hidden;
      border-radius: 10px;

      .bannerImg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .banner-title {
        position: absolute;
        bottom: 20px;
        left: 17px;
        color: white;
        font-size: 15px;
        background-image: linear-gradient(
          180deg,
          rgba(255, 0, 0, 0),
          rgba(0, 0, 0, 0.3)
        );
      }

      .custom-indicator {
        position: absolute;
        right: 8px;
        bottom: 17px;
        padding: 2px 5px;
        font-size: 15px;
        color: white;
      }

      .custom-indicator > span {
        font-size: 17px;
        font-weight: 700;
      }
    }

    .short-info {
      width: 93.6%;
      background-color: #fff;
      margin: 7px auto;
      border-radius: 5px;
      .info-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 32px;
        padding-top: 17px;
        padding-left: 15px;
        padding-right: 11px;
        .userinfo {
          display: flex;
          align-items: center;
          .img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 32px;
              height: 32px;
            }
          }
          p {
            font-size: 12px;
            padding-left: 6px;
            color: #212121;
          }
        }

        .icon-gengduo-shuxiang {
          font-size: 17px;
          color: #8f8f8f;
        }
      }

      .text {
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        padding-left: 16px;
      }

      .text-img {
        width: 100%;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
        }
        .img-bottom {
          position: absolute;
          right: 10px;
          bottom: 0;
          height: 28px;
          line-height: 28px;
          font-size: 12px;
          color: hsla(0, 0%, 100%, 0.9);
        }
      }

      .short-info-bottom {
        display: flex;
        .collect,
        .pinglun,
        .like {
          flex: 1;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 13px;
        }
        .icon-shoucang,
        .icon-bijijilu,
        .icon-dianzan {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
