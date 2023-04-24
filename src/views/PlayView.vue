<template>
  <div class="play" v-if="bool.show">
    <div class="video">
      <div class="video-top">
        <span class="iconfont icon-fanhui" @click="back($event)"></span>
        <span
          class="iconfont icon-gengduo-shuxiang"
          @click="showShare = true"
        ></span>
      </div>
      <vue3VideoPlay v-bind="options.op" :poster="playDetail.data.cover" />
    </div>
    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options2"
    />

    <van-tabs
      v-model:active="active"
      title-inactive-color="#868686"
      color="red"
      sticky
    >
      <van-tab title="简介">
        <div class="video-info">
          <h2 class="video-title">
            {{ playDetail.data.title }}
          </h2>
          <div class="video-jianjie">
            <span v-for="item in playDetail.data.categories"
              >{{ item.category_name }}-{{ item.sub.category_name }}</span
            >
            <span>{{ formateDate(playDetail.data.publish_time * 1000) }}</span>
            <span
              >{{ formatWatch(playDetail.data.count.count_view) }}次播放</span
            >
          </div>
          <p class="video-content">{{ playDetail.data.content }}</p>
        </div>

        <div class="video-sanlian">
          <div
            class="video-dianzan"
            @click="like(playDetail.data.id, playDetail.data.count)"
          >
            <span v-show="!isLiked" class="iconfont icon-dianzan"></span>
            <span v-show="isLiked" class="iconfont icon-dianzan active"></span>
            {{ playDetail.data.count.count_like }}
          </div>
          <div class="video-shoucang">
            <span class="iconfont icon-shoucang"></span>
            {{ playDetail.data.count.count_collect }}
          </div>
          <div class="video-zhuanfa">
            <span class="iconfont icon-zhuanfa"></span>
            {{ playDetail.data.count.count_share }}
          </div>
        </div>

        <div class="video-tips">
          <div class="intips">
            <span class="tip" v-for="item in playDetail.data.tags">{{
              item.name
            }}</span>
          </div>
        </div>

        <!-- 创作人 -->
        <div class="video-author">
          <h3 class="author-title">创作人</h3>
          <div class="author-box">
            <div class="author-single">
              <div class="image">
                <img :src="playDetail.data.author.userinfo.avatar" alt="" />
              </div>
              <div class="text">
                <div class="name">
                  {{ playDetail.data.author.userinfo.username }}
                </div>
                <div class="type">{{ playDetail.data.author.role }}</div>
              </div>
              <div class="follow">关注</div>
            </div>
            <div class="author-single" v-for="item in playDetail.data.team">
              <div class="image">
                <img :src="item.userinfo.avatar" alt="" />
              </div>
              <div class="text">
                <div class="name">{{ item.userinfo.username }}</div>
                <div class="type">{{ item.role }}</div>
              </div>
              <div class="follow">关注</div>
            </div>
          </div>
        </div>

        <!-- <div class="video-similar" v-if="similarBool.show">
          <h3 class="similar-title">相似视频</h3>
          <div class="similar-box" v-for="item in similarVideo.list">
            <div class="similar-bigimg">
              <img
                :src="item.cover"
                alt=""
              />
              <div class="similar-time">{{formatTime(item.duration)}}</div>
            </div>
            <div class="similar-info">
              <h4>{{item.share_info.title}}</h4>
              <p>播放 {{formatWatch(item.count.count_view)}} · 喜欢 {{item.count.count_like}}</p>
              <div class="similar-author">
                <div class="pics">
                  
                  <div class="img1">
                    <img :src="item.author.userinfo.avatar" alt="" />
                  </div>
                  <div class="img2" v-if="item.team.length>0">
                    <img :src="item.team[0].userinfo.avatar" alt="" />
                  </div>
                  <div class="img3" v-if="item.team.length>1">
                    <img :src="item.team[1].userinfo.avatar" alt="">
                  </div>
                </div>
                <div class="all">
                  <span class="firstname" v-if="item.team.userinfo"> {{item.team.userinfo.username}} </span>
                  <span class="firstname" v-else>{{ item.author.userinfo.username }}</span>
                  <span v-if="item.team.length>0">等{{item.team.length}}位创作人</span>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- 双层嵌套拿完所有照片
        <div class="img1" v-for="(item2,i) in item.team" :key="i">
          <img :src="item2.userinfo.avatar" alt="" />
        </div> -->

          <div class="simi-title">相似视频</div>
          <similarView
            :List="similarVideo.list"
            v-if="similarBool.show"
          ></similarView>
    
        
      </van-tab>

      <van-tab v-if="CommentBool.show">
        <template #title>评论 <span class="commentNum">{{ videoComment.total }}</span> 
        </template>
        <div class="video-comment" v-for="item in videoComment.list">
          <div class="comment-img">
            <img :src="item.userInfo.avatar" alt="" />
          </div>
          <div class="comment-info">
            <div class="info-top">
              <div class="comment-name">{{ item.userInfo.username }}</div>
              <span class="iconfont icon-gengduo-shuxiang"></span>
            </div>
            <div class="comment-text">
              {{ item.content }}
            </div>
            <div class="comment-bottom">
              <p>{{ formateDate(item.addtime * 1000) }}</p>
              <div class="comment-like">
                <span class="iconfont icon-dianzan"></span>
                {{ item.count_approve }}
              </div>
            </div>
          </div>
        </div>
        <div class="blank-comment"></div>
        <div class="commit">
          <input type="text"  placeholder="我有话要说">
          <div class="submit">发布</div>
        </div>
      </van-tab>

    </van-tabs>
  </div>
</template>
  
<script setup>
import { getPlayDetail, getSimilarVideo, getVideoComment } from "../api/play";
import { reactive, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatWatch, formatTime, formateDate } from "../utils/utils";
import similarView from "../components/HomeTab/SimilarView.vue";

const active = ref(0);
const route = useRoute();
const router = useRouter();

//视频数据
var playDetail = reactive({
  data: {},
});
var bool = reactive({
  show: false,
});
var options = reactive({
  op:{}
});

// 是否点赞
var isLiked = ref(false);

const showShare = ref(false);
const options2 = [
  [
    { name: "微信", icon: "wechat" },
    { name: "朋友圈", icon: "wechat-moments" },
    { name: "微博", icon: "weibo" },
    { name: "QQ", icon: "qq" },
  ],
  [
    { name: "复制链接", icon: "link" },
    { name: "分享海报", icon: "poster" },
    { name: "二维码", icon: "qrcode" },
    { name: "小程序码", icon: "weapp-qrcode" },
  ],
];

// 视频内的相关视频数据
var similarVideo = reactive({});
var similarBool = reactive({
  show: false,
});

//视频评论数据
var videoComment = reactive({});
var CommentBool = reactive({
  show: false,
});

watch(
  ()=> router.currentRoute.value,
  (newValue,oldValue)=>{
    console.log('router.currentRoute',router.currentRoute);
    console.log('新路由',newValue);
    getPlayDetail(newValue.query.id).then((res) => {
      // console.log(res);
      playDetail.data = res.data.data;
      console.log('视频数据',playDetail.data);
      bool.show = true;

      isLikeVideo();

      var obj = {
        width: "100%", //播放器高度
        height: "210px", //播放器高度
        color: "#409eff", //主题色
        title: "", //视频名称
        src: playDetail.data.video.content.progressive[0].url, //视频源
        muted: false, //静音
        webFullScreen: false,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        autoPlay: false, //自动播放
        loop: false, //循环播放
        mirror: false, //镜像画面
        ligthOff: false, //关灯模式
        volume: 0.3, //默认音量大小
        control: true, //是否显示控制
        controlBtns: [
          "audioTrack",
          "quality",
          "speedRate",
          "volume",
          "setting",
          "pip",
          "fullScreen",
        ], //显示所有按钮,
      };
      options.op = obj;
    });

    getSimilarVideo(newValue.query.id).then((res) => {
      // console.log(res);
      similarVideo = res.data.data;
      console.log(similarVideo);
      similarBool.show = true;
  });

  getVideoComment(newValue.query.id).then((res) => {
    // console.log(res);
    videoComment = res.data.data;
    console.log('评论数据',videoComment);
    CommentBool.show = true;
  });
  

},{ immediate: true })

onMounted(() => {
  // console.log(router);
  console.log("---------------route-----------", route);
  // getPlayDetail(route.query.id).then((res) => {
  //   // console.log(res);
  //   playDetail.data = res.data.data;
  //   console.log('视频数据',playDetail.data);
  //   bool.show = true;

  //   isLikeVideo();

  //   var obj = {
  //     width: "100%", //播放器高度
  //     height: "210px", //播放器高度
  //     color: "#409eff", //主题色
  //     title: "", //视频名称
  //     src: playDetail.data.video.content.progressive[0].url, //视频源
  //     muted: false, //静音
  //     webFullScreen: false,
  //     speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  //     autoPlay: false, //自动播放
  //     loop: false, //循环播放
  //     mirror: false, //镜像画面
  //     ligthOff: false, //关灯模式
  //     volume: 0.3, //默认音量大小
  //     control: true, //是否显示控制
  //     controlBtns: [
  //       "audioTrack",
  //       "quality",
  //       "speedRate",
  //       "volume",
  //       "setting",
  //       "pip",
  //       "fullScreen",
  //     ], //显示所有按钮,
  //   };
  //   options.op = obj;
  // });

  // getSimilarVideo(route.query.id).then((res) => {
  //   // console.log(res);
  //   similarVideo = res.data.data;
  //   console.log(similarVideo);
  //   similarBool.show = true;
  // });

  // getVideoComment(route.query.id).then((res) => {
  //   // console.log(res);
  //   videoComment = res.data.data;
  //   console.log('评论数据',videoComment);
  //   CommentBool.show = true;
  // });
});
// 返回上一个页面，路由跳转back或go方法
const back = function (e) {
  // router.back()
  router.go(-1);
};

// // const reload = inject('reload')
// reload()

const isLikeVideo = function () {
  var arr = JSON.parse(localStorage.getItem("liked"));
  if (arr) {
    arr.forEach((item) => {
      if (playDetail.data.id == item.id) {
        playDetail.data.count = item.count;
        isLiked.value = item.isLiked;
      }
    });
  }
};

//点赞
const like = function (id, count) {
  // var str = 'wqoeijod1290d&wqioeuoj6e=37e618204d805dca0fb5'
  // localStorage.setItem('token',str);
  var token = localStorage.getItem("token");
  // 判断有没有登录 此处用上面设置的假token
  if (token) {
    console.log("验证成功");
    // 设置数组，防止一个视频点赞了 再点赞下一个视频把上一个视频点赞数据挤掉了
    var arr = JSON.parse(localStorage.getItem("liked")) || [];
    //已点赞再点取消
    if (isLiked.value) {
      count.count_like = count.count_like -= 1;
      // 把已点赞的数组删除
      var index = arr.findIndex((item)=> item.id == id)
      arr.splice(index,1)
      localStorage.setItem("liked", JSON.stringify(arr));
    } else {
      // 没点赞 要点赞
      count.count_like = count.count_like += 1;
      arr.push({
        id: id,
        count: count,
        isLiked: true,
      });
      localStorage.setItem("liked", JSON.stringify(arr));
    }
    playDetail.data.count = count;
    isLiked.value = !isLiked.value;
  } else {
    console.log("验证失败");
    router.push({
      path: "/login",
    });
  }
};
</script>
  
<style scoped lang="less">
.video {
  width: 100%;
  height: 210px;
  position: relative;
  .video-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    padding: 5px 10px;
    box-sizing: border-box;

    .icon-fanhui,
    .icon-gengduo-shuxiang {
      font-size: 18px;
      color: white;
    }
  }
}

.play {
  width: 375px;

  .video-tips {
    // width: 100%;
    // height: 60px;
    // display: flex;
    height: 80px;
    // overflow: hidden;

    .intips {
      flex: 1;
      .tip {
        display: inline-block;
        height: 46px;
        line-height: 46px;
        font-size: 18px;
        padding: 0 24px;
        transform: scale(0.5);
        border-radius: 6px;
        background-color: #f7f7f7;
        color: #737373;
        margin-left: -13px;
        margin-right: -12px;
        margin-top: -12px;
        margin-bottom: 3px;
      }
    }
  }

  .video-author {
    .author-title {
      height: 45px;
      line-height: 45px;
      margin-left: 20px;
      font-size: 15px;
      font-weight: 700;
    }
    // .author-box:hover{
    //     overflow-x:scroll
    //   }

    .author-box {
      // width: 100%;
      margin-left: 15px;
      overflow-x: scroll;
      display: flex;
      // border-bottom: 1px solid #000;

      .author-single {
        width: 260px;
        height: 72px;
        padding-right: 15px;
        margin-right: 15px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        box-shadow: 7px 6px 2px 0 #eee;

        img {
          width: 50px;
          height: 50px;
        }
        .text {
          width: 100px;
          padding: 15px 40px 10px 0;
          .name {
            font-size: 14px;
            text-align: center;
          }
          .type {
            color: #a5a5a5;
            font-size: 18px;
            transform: scale(0.5);
          }
        }
        .follow {
          width: 72px;
          height: 28px;
          background-color: #f9edec;
          color: #d3513e;
          font-size: 12px;
          line-height: 28px;
          text-align: center;
          border-radius: 14px;
        }
      }
    }
  }

  .simi-title{
    height: 45px;
    line-height: 45px;
    margin-left: 20px;
    margin-top: 15px;
    font-size: 15px;
    font-weight: 700;
  }
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
  }

  .commentNum{
    color: red;
  }
  .video-comment {
    padding-top: 10px;
    display: flex;
    .comment-img {
      width: 33px;
      height: 33px;
      margin: 2px 15px 15px;

      img {
        width: 33px;
        height: 33px;
        border-radius: 50%;
      }
    }
    .comment-info {
      flex: 1;

      .info-top {
        height: 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .comment-name {
          font-size: 12px;
          color: #5c5c5c;
        }
        .icon-gengduo-shuxiang {
          font-size: 12px;
          color: #ababab;
          padding-right: 15px;
        }
      }

      .comment-text {
        font-size: 13px;
        padding-right: 26px;
        margin-top: 8px;
        line-height: 23px;
      }

      .comment-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          width: 95px;
          font-size: 18px;
          transform: scale(0.5);
          color: #aaa;
          margin-left: -22px;
        }
        .comment-like {
          margin-right: 20px;
          font-size: 12px;
          line-height: 28px;
          color: #333;
          .icon-dianzan {
            font-size: 13px;
            color: #333;
          }
        }
      }
    }
  }
  .blank-comment{
    height: 50px;
  }
  .commit{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    background-color: #fff;
    input{
      flex: 1;
      height: 30px;
      background: none;
      background-color: #f0f0f0;
      border-radius: 4px;
      outline: none;
      border: none;
      margin-left: 12px;
      padding-left: 10px;
      font-size: 13px;
    }
    .submit{
      width: 60px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      color: #d1422d;
    }
  }
}
/deep/.van-tabs__wrap {
  height: 34px;
  border-bottom: 1px solid #f8f8f8;
}

/deep/.van-tab__text {
  font-weight: 700;
  font-size: 13px;
}
.video-info {
  padding: 10px 12px;
  .video-title {
    font-weight: 600;
    font-size: 19px;
    font-family: 黑体;
  }
  .video-jianjie {
    display: flex;
    font-size: 12px;
    color: #a3a3a3;
    margin: 15px 0;
    justify-content: space-between;
  }
  .video-content {
    font-size: 12px;
    color: #3c3c3c;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

.video-sanlian {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  .video-dianzan {
    display: flex;
    flex-direction: column;
    align-items: center;

    .active {
      color: red;
    }
  }
  .video-shoucang {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .video-zhuanfa {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.icon-dianzan,
.icon-shoucang,
.icon-zhuanfa {
  padding-bottom: 5px;
}
</style>