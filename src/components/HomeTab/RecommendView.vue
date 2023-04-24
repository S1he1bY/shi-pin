<template>
  <div class="main">
    <!-- 轮播图 -->
    <div class="recommend">
      <div class="banner">
        <van-swipe autoplay="3000">
          <van-swipe-item v-for="(item, index) in bannerList.data" :key="index">
            <img :src="item.model.cover" class="bannerImg" alt="" />
            <div class="title">{{ item.model.title }}</div>
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="custom-indicator">{{ active + 1 }} / {{ total }}</div>
          </template>
        </van-swipe>
      </div>
    </div>
    <!-- 中等卡片 -->
    <div class="middle-card">
      <handlerMid :midList="handlerList.data.first"></handlerMid>

      <!-- 大卡片 -->
      <div v-if="bool.show">
        <div class="big-card" v-if="handlerList.data.bigCard" @click="goVideo(handlerList.data.bigCard[0].children[0].model.resource.id)">
          <div class="card-img">
            <img
              class="big-cover"
              :src="handlerList.data.bigCard[0].children[0].model.resource.cover"
              alt=""
            />
            <div class="img-content">
              {{
                formatWatch(
                  handlerList.data.bigCard[0].children[0].model.resource.count
                    .count_view
                )
              }}观看 |
              {{
                formatTime(
                  handlerList.data.bigCard[0].children[0].model.resource.duration
                )
              }}
            </div>
          </div>
          <div class="big-bottom">
            <div class="tips">
              <span class="iconfont icon-zhiboguankanshu"></span>大家都在看
            </div>
            <div class="big-info">
              <div class="left">
                <div class="info-title">
                  {{
                    handlerList.data.bigCard[0].children[0].model.resource.title
                  }}
                </div>
                <div class="user-info">
                  <div class="photo">
                    <img
                      :src="
                        handlerList.data.bigCard[0].children[0].model.resource
                          .author.userinfo.avatar
                      "
                      alt=""
                    />
                  </div>
                  <div class="name">
                    {{
                      handlerList.data.bigCard[0].children[0].model.resource
                        .author.userinfo.username
                    }}
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="right-item">
                  <span class="iconfont icon-dianzan"></span>
                  <p>
                    {{
                      handlerList.data.bigCard[0].children[0].model.resource.count
                        .count_collect
                    }}
                  </p>
                </div>
                <div class="right-item">
                  <span class="iconfont icon-dianzan"></span>
                  <p>
                    {{
                      handlerList.data.bigCard[0].children[0].model.resource.count
                        .count_like
                    }}
                  </p>
                </div>
                <div class="right-item">
                  <span class="iconfont icon-gengduo-shuxiang"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <handlerMid :midList="handlerList.data.second"></handlerMid>

      <!-- 创作人 -->
      <div class="creator" v-if="handlerList.data.creatorList">
        <div class="creator-title">
          <h3>推荐创作人</h3>
          <p>查看更多 &nbsp; &gt;</p>
        </div>
        <ul class="creator-list">
          <li
            class="creator-item"
            v-for="(item, index) in handlerList.data.creatorList"
            :key="index"
          >
            <div class="creator-photo">
              <img :src="item.model.resource.avatar" alt="" />
            </div>
            <div class="creator-name">
              {{ item.model.resource.username }}
            </div>
            <div class="creator-count">
              {{ item.model.resource.count.count_article }} 作品 ·
              {{ item.model.resource.count.count_follower }} 粉丝
            </div>
            <div class="creator-job">
              {{ item.model.resource.occupation }}
            </div>
            <div class="creator-follow">+关注</div>
          </li>
        </ul>
      </div>

      <handlerMid :midList="handlerList.data.third"></handlerMid>

      <!-- 广告 -->
      <div class="advertise" v-if="handlerList.data.ad">
        <div class="left">
          <div class="picture">
            <img
              :src="
                handlerList.data.ad[0].children[0].model.resource.creator.avatar
              "
              alt=""
            />
          </div>
          <div class="ad-content">
            <p>
              {{
                handlerList.data.ad[0].children[0].model.resource.creator
                  .username
              }}
            </p>
          </div>
          <div>
            <span class="iconfont icon-gengduo-shuxiang"></span>
          </div>
        </div>
        <div class="top">
          <h3 class="ad-bottom">
            {{ handlerList.data.ad[0].children[0].model.resource.title }}
          </h3>
        </div>
        <div class="content-photo">
          <img
            :src="handlerList.data.ad[0].children[0].model.resource.cover"
            alt=""
          />
        </div>
        <div class="ad-bottom-end">立即查看</div>
      </div>
    </div>
  </div>

  <div class="blank"></div>
</template>
  
<script setup>
import { getRecommend } from "../../api/home";
import { ref, reactive, onMounted } from "vue";
import handlerMid from "../handlerMidCard.vue";
import { formatWatch, formatTime } from "../../utils/utils";
import { useRouter } from "vue-router";

const router = useRouter()

const bool = reactive({
  show:false
})

// 轮播图
var bannerList = reactive({
  data: [],
});

// 中等卡片
var middleList = reactive({
  middle: [],
});

// 推荐页面最终数据处理
var handlerList = reactive({
  data: {},
});

const goVideo = (id)=>{
  router.push({
    path:'/play',
    query:{
      id:id,
    }
  }).then(()=>{
    router.go(0)
  })
}

onMounted(() => {
  getRecommend().then((res) => {
    // 轮播图
    // console.log("recommend", res);
    console.log(res.data.data.children);
    var data = res.data.data.children;
    // 拿到轮播图索引号
    var bannerIndex = data.findIndex((item) => item.type == "uiBanner");
    // console.log(bannerIndex);
    bannerList.data = data[bannerIndex].children;
    console.log("轮播图数据", bannerList.data);

    //中等卡片
    data.forEach((item) => {
      if (item.type === "uiMiddleCard") {
        middleList.middle.push(item);
      }
    });
    // console.log(middleList.middle);

    var firstArr = [];
    var secondArr = [];
    var thirdArr = [];

    middleList.middle.forEach((item, index) => {
      if (index >= 0 && index <= 3) {
        firstArr.push(item);
        handlerList.data.first = firstArr;
      } else if (index >= 4 && index <= 7) {
        secondArr.push(item);
        handlerList.data.second = secondArr;
      } else if (index >= 9 && index <= 16) {
        thirdArr.push(item);
        handlerList.data.third = thirdArr;
      }
    });
    // console.log(handlerList.data);

    // 处理大卡片数据
    var bigArr = [];
    data.forEach((item) => {
      if (item.type === "uiBigCardTop") {
        bigArr.push(item);
      }
    });
    handlerList.data.bigCard = bigArr;
    console.log("大卡片数据", handlerList.data.bigCard);
    bool.show = true

    // 广告数据
    var adArr = [];
    data.forEach((item) => {
      if (item.type === "uiBigCard") {
        adArr.push(item);
      }
    });
    handlerList.data.ad = adArr;
    console.log("广告数据", handlerList.data.ad);

    // 创作人数据
    var creatorIndex = data.findIndex(
      (item) => item.type === "uiCollectionSlideOne"
    );
    handlerList.data.creatorList = data[creatorIndex].children;
    console.log("创作人数据", handlerList.data.creatorList);
  });
});
</script>
  
<style scoped lang="less">
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 15px;
  padding: 2px 5px;
  font-size: 15px;
  color: white;
}

.custom-indicator > span {
  font-size: 17px;
  font-weight: 700;
}
.main {
  min-width: 375px;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;
}
.recommend {
  padding: 10px 15px;
  background: #f7f7f7;
  .banner {
    height: 197px;
    border-radius: 12px;
    overflow: hidden;
    .bannerImg {
      // width: 351px;
      height: 197px;
      // position: relative;
      // object-fit: cover;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .title {
      position: absolute;
      color: white;
      bottom: 15px;
      left: 16px;
      font-size: 15px;
    }
  }
}

// 大卡片
.big-card {
  width: 95%;
  // width: 340px;
  // height: 197px;
  position: relative;
  background-color: #fff;
  margin-top: 10px;
  .card-img {
    width: 100%;

    .big-cover {
      // width: 351.18px;
      // height: 197.53px;
      width: 100%;
      margin: 5px 10px;
      border-radius: 10px;
    }
  }

  .img-content {
    position: absolute;
    right: 15px;
    top: 185px;
    color: white;
    font-size: 12px;
    font-weight: 600;
  }

  .tips {
    font-size: 12px;
    background-color: #f8dedd;
    color: #d14530;
    width: fit-content;
    padding: 1px 8px;
    margin-left: 10px;
    border-radius: 10px;
  }
  .icon-zhiboguankanshu {
    font-size: 12px;
  }
  .big-info {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding-left: 15px;
    .info-title {
      font-size: 14px;
    }

    .user-info {
      display: flex;
      margin-top: 10px;
      align-items: center;
      padding-bottom: 5px;
      .photo {
        width: 20px;
        height: 20px;
        img {
          width: 100%;
          height: 100%;
          // width: 50px;
          border-radius: 50%;
        }
      }
      .name {
        font-size: 12px;
        color: #292929;
        margin-left: 5px;
      }
    }
  }

  .right {
    display: flex;
    width: 100px;
    justify-content: space-between;
    align-items: center;

    .right-item {
      text-align: center;
      span {
        font-size: 18px;
      }
      .icon-gengduo-shuxiang {
        color: #ababab;
      }

      p {
        font-size: 12px;
        margin: 0;
        transform: scale(0.8);
      }
    }
  }
}

// .creator  .creator-list:hover{
//     overflow-x: scroll;
//   }
// 创作人
.creator {
  width: 100%;
  padding-top: 20px;
  // overflow: hidden;
  background-color: #f7f7f7;
  .creator-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    h3 {
      font-size: 16px;
      font-weight: 900;
    }
    p {
      color: #868686;
      font-size: 12px;
    }
  }

  .creator-list:hover {
    overflow-x: scroll;
  }
  .creator-list {
    margin-top: 10px;
    display: flex;
    overflow-x: hidden;
    .creator-item {
      width: 166px;
      height: 170px;
      background-color: #fff;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 9px 5px 10px;

      .creator-photo {
        width: 46px;
        height: 46px;
        margin: 10px 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .creator-name {
        font-size: 12px;
        margin-bottom: 10px;
        font-weight: 600;
      }

      .creator-count,
      .creator-job {
        width: 166px;
        font-size: 18px;
        color: #9c9c9c;
        transform: scale(0.5);
        margin-top: 0px;
      }

      .creator-follow {
        width: 70px;
        height: 26px;
        background-color: #d55644;
        border-radius: 13px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 26px;
        margin-top: 9px;
        margin-bottom: 14px;
      }
    }
  }
}

// 广告
.advertise {
  // width: 351px;
  // height: 316px;
  width: 100%;
  background-color: #fff;
  // display: flex;
  .left {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0px;
    .picture {
      width: 30px;
      height: 30px;
      display: flex;
      margin-left: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .ad-content p {
      padding-right: 158px;
    }
    .icon-gengduo-shuxiang {
      font-size: 12px;
    }
  }
  .top {
    .ad-bottom {
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      padding-left: 16px;
    }
  }

  .content-photo {
    width: 351px;
    height: 193px;
    margin-left: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .ad-bottom-end {
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    padding-left: 16px;
    color: #5c5c5c;
  }
}

.blank {
  height: 50px;
}
</style>