<template>
  <div class="user">
    <div class="user-box" v-if="isLogin.show">
      <div class="user-top">
        <div class="user-img" v-if="token">
          <img :src="userInfo.data.avatar" alt="">
        </div>
        <div class="user-img" v-else>
          <img src="https://cs.xinpianchang.com/passport/default.jpg" alt="">
        </div>
        <p v-if="token">{{userInfo.data.username}}</p>
        <p @click="goLogin" v-else>点击登录</p>
      </div>
      <div class="user-follow">
        <div class="user-fleft">
           <p>{{userInfo.data.count.count_followee}}</p>
           <p class="text">关注</p>
        </div>
        <div class="fright">
          <p>{{userInfo.data.count.count_follower}}</p>
          <p class="text">粉丝</p>
        </div>
      </div>
      <div class="user-content">
        <div class="user-collect">
          <h3>我的收藏</h3>
          <span class="iconfont icon-jiantou_liebiaoxiangyou_o"></span>
        </div>
        <div class="user-like">
          <h3>我的喜欢</h3>
          <span class="iconfont icon-jiantou_liebiaoxiangyou_o"></span>
        </div>
        <div class="user-history">
          <h3>历史记录</h3>
          <span class="iconfont icon-jiantou_liebiaoxiangyou_o"></span>
        </div>
        <div class="about">
          <h3>关于我们</h3>
          <span class="iconfont icon-jiantou_liebiaoxiangyou_o"> </span>
        </div>
      </div>

      <div class="quit-user" v-if="token" @click="quitLogin">
        退出登录
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import {getUserInfo} from '../api/user'
import { showNotify } from 'vant';

const route = useRoute()
console.log('-----route-----',route);
const router = useRouter()
const userInfo = reactive({
  data:{}
})
const isLogin = reactive({
  show:false
})

var token = localStorage.getItem('token')

onMounted(()=>{
  getUserInfo(13619380).then((res)=>{
      // console.log('用户数据',res);
    userInfo.data = res.data.data
    console.log('用户数据',userInfo.data);
    isLogin.show = true
  })
})

// 点击登录
const goLogin = ()=>{
  router.push({
    path:'/login'
  }).then(()=>{
    router.go(0)
  })
  if(token){
    // isLogin.show = true
    getUserInfo().then((res)=>{
      console.log('用户数据',res);
    })
  }
}

// 退出登录
const quitLogin = ()=>{
  localStorage.removeItem('token')
  showNotify({type: 'success',color: 'black',background: 'green',message:'退出登陆成功！',position: 'center'})
  router.push({
    path:'/user'
  }).then(()=>{
    router.go(0)
  })
}
</script>

<style scoped lang="less">
.user{
    min-width: 375px;
    max-width: 750px;
    margin: 0 auto;
    height: 667px;
  .user-box{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(#f1e0de 15%,#f3f4f5 30%);
    .user-top{
      display: flex;
      align-items: center;
      padding: 30px 20px;

      .user-img{
        width: 55px;
        height: 55px;
        margin-right: 15px;

        img{
          width: 100%;
          border-radius: 50%;
        }
      }
    }

    .user-follow{
      display: flex;

      .user-fleft{
        flex:1;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
        border-right: 1px solid #a6aab4;
        // .user-fleft::after{
        //   display: block;
        //   content: '';
        //   width: 2px;
        //   height: 20px;
        //   background-color: #a6aab4;
        //   // position: absolute;
        //   margin: 0 auto;
        // }

      }

      .fright{
        flex:1;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
      }
      .text{
        color: #a6aab4;
      }
    }

    .user-content{
      width: 94%;
      margin: 10px auto;
      margin-top: 40px;
      background-color: #fefefe;
      border-radius: 6px;
      .user-collect{
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        margin: 0 15px;
        border-bottom: 1px solid #f3f4f5;
      }
      .user-like{
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        margin: 0 15px;
        border-bottom: 1px solid #f3f4f5;
      }
      .user-history{
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        margin: 0 15px;
        border-bottom: 1px solid #f3f4f5;
      }
      .about{
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        margin: 0 15px;
        border-bottom: 1px solid #f3f4f5;
      }
      h3{
        font-size: 14px;
      }
      .icon-jiantou_liebiaoxiangyou_o{
        font-size: 24px;
        color: #a6aab4;
      }
    }

    .quit-user{
      width: 80%;
      height: 50px;
      line-height: 50px;
      margin: 0 auto;
      margin-top: 40px;
      background-color: #e45e51;
      text-align: center;
      color: #fff;
      font-size: 16px;
      border-radius: 10px;
    }
  }
}
</style>