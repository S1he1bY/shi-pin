<template>
  <div class="main">
    <div class="note" >
      <van-sticky>
        <div class="note-top">手记</div>
      </van-sticky>
      <div class="note-info" v-for="item in notes.list" :key="item.id" v-if="notesBool.show">
        <!-- 用户信息 -->
        <div class="top">
          <div class="top-img">
            <img
              :src="item.user.avatar"
              alt=""
            />
          </div>
          <div class="top-context">
            <p class="top-name">{{item.user.username}}</p>
            <p class="top-time">{{getDistanceTime(item.addtime * 1000)}} 发布</p> 
            
          </div>
          <!-- vant分享组件通过showshare点击显示分享界面-->
          <van-share-sheet
            v-model:show="showShare"
            title="立即分享给好友"
            :options="options2"
            :overlay-style="{backgroundColor:'rgba(0,0,0,0.1)'}"
        
          />
          <span class="iconfont icon-gengduo-shuxiang" @click="showShare = true"></span>
        </div>

        <!-- 手记标题和内容 -->
        <div class="note-title" v-if="item.title"  @click="goNote(item.id)">{{item.title}}</div>
        <div class="note-context" @click="goNote(item.id)">
          <p class="content">{{item.content}}</p>
        </div>
        <!-- 内容里的图片 -->
        <div class="note-pic" v-if="item.images!=null" @click="goNote(item.id)">
          <div class="pic-box"  v-for="(item2,i) in item.images" :key="i">
            <img :src="item2" alt="">
          </div>
        </div>
        <!-- 跳转视频 -->
        <div class="note-video" v-if="item.article.id" @click="goVideo(item.article.id)">
          <div class="video-img" v-if="item.article.cover">
            <img :src="item.article.cover" alt="">
          </div>
          <div class="video-text" v-if="item.article.title">
            <p class="video-title">{{item.article.title}}</p>
            <p class="video-name">@{{item.article.author.userinfo.username}}</p>
          </div>
        </div>
        <!-- 底部三连 -->
        <div class="note-bottom" @click="goNote(item.id)">
          <div class="sanlian-box">
            <span class="iconfont icon-dianzan"></span>
            <p>{{item.count.count_liked}}</p>
          </div>
          <div class="sanlian-box">
            <span class="iconfont icon-bijijilu"></span>
            <p>{{item.count.count_commented}}</p>
          </div>
          <div class="sanlian-box">
            <span class="iconfont icon-zhuanfa"></span>
            <p>分享</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { getNotes } from "../api/note";
import { Sticky } from "vant";
import { getDistanceMonth,getCurMonthDay,getDistanceTime,getNowMonth,getYearDay } from "../utils/utils";

const router = useRouter();

// vant分享
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


const notesBool = reactive({
  show: false,
});
// 手记数据
const notes = reactive({
  list: [],
});

// 跳转手记内容页面
const goNote = (id)=>{
  router.push({
    path:'/notecontent',
    query:{
      id:id
    }
  }).then(()=>{
    router.go(0)
  })
}

// 手记内有视频的跳转
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
  getNotes().then((res) => {
    // console.log(res);
    notes.list = res.data.data.list;
    console.log("手记数据", notes.list);
    notesBool.show = true;
  });
});
</script>

<style scoped lang="less">
.main {
  min-width: 375px;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;

  .blank{
    height: 50px;
  }

  .note {
    width: 100%;
    height: 100%;
    background-color: #f3f4f5;
    .note-top {
      width: 100%;
      height: 42px;
      border-bottom: 1px solid #dcdbdc;
      font-size: 17px;
      font-weight: 700;
      font-family: 黑体;
      text-align: center;
      line-height: 42px;
      background-color: hsla(0, 0%, 100%, 0.98);
    }

    .note-info {
      margin-top: 7px;
      width: 100%;
      background-color: #fff;
      .top {
        display: flex;
        align-items: center;
        padding: 10px 15px 15px 15px;
        .top-img {
          width: 40px;
          height: 40px;

          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .top-context {
          flex:1;
          margin-left: 15px;
          margin-top: 5px;
          line-height: 17px;
          .top-name{
            color: #111622;
            font-size: 14px;
            
          }
          .top-time{
            // width: 150px;
            // height: 28px;
            font-size: 20px;
            transform: scale(.5);
            margin-left: -99px;
            color: #a2a7b1;
          }
        }
        .icon-gengduo-shuxiang{
          font-size: 14px;
          color: #848484;
          line-height: 34px;
        }
      }

      .note-title{
        padding: 0 15px;
        font-size: 15px;
        font-family: 黑体;
        line-height: 25px;
      }

      .note-context{

        .content{
          padding: 0 15px;
          color: #0e1624;
          font-size: 13px;
          line-height: 23px;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      }

      .note-pic{
        display: flex;
        padding: 10px 15px;
        .pic-box{
          width: 110px;
          height: 110px;
          margin-right: 10px;
          display: none;
          img{
            width: 100%;
            height: 100%;
            border-radius: 6px;
            object-fit: cover;
          }
        }
        .pic-box:nth-child(1),.pic-box:nth-child(2),.pic-box:nth-child(3){
          display: block;
        }
      }

      .note-video{
        display: flex;
        margin: 10px 15px;
        // padding: 0 15px;
        background-color: #f3f4f5;
        border-radius: 6px;
        overflow: hidden;

        .video-img{
          width: 160px;
          img{
            width: 160px;
            object-fit: cover;
          }
        }

        .video-text{
          padding: 0 12px;
          .video-title{
            margin-top: 12px;
            line-height: 20px;
            font-size: 14px;
            color: #030c1a;
            // height: auto;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .video-name{
            height: 25px;
            line-height: 25px;
            font-size: 12px;
            color: #a1a7b1;
          }
        }
      }

      .note-bottom{
        display: flex;
        width: 96%;
        height: 43px;
        border-top: 1px solid #f3f4f5;

        .sanlian-box{
          flex: 1;
          display: flex;
          align-items: center;
          margin-left: 50px;

          .icon-dianzan,.icon-bijijilu,.icon-zhuanfa{
            font-size: 16px;
            color: #474e5e;
          }
          p{
            font-size: 12px;
            line-height: 2px;
            padding-left: 1px;
          }
        }
      }
    }
  }
}
</style>