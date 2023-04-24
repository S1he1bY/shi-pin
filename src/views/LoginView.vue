<template>
  <div class="login">
    <div class="login-top">
      <span class="iconfont icon-fanhui" @click="goback"></span>
      <!-- <span @click="toRegister">注册</span> -->
      <router-link to="/register">注册</router-link>
    </div>
    <div class="bg">
        <img src="../assets/images/login-bg.png" alt="">
    </div>
    <div class="login-container">
      <h1>登录</h1>
      <div class="login-box">
        <van-form>
          <van-cell-group inset>
            <div class="login-area">
                <span>中国大陆+86</span>
                <span> > </span>
            </div>
            <!-- 通过 validator 进行函数校验 -->
            <van-field
              v-model="phone"
              name="validatorPhone"
              placeholder="请输入手机号"
              :rules="[{ validatorPhone, message: '请输入正确的手机号' }]"
            />
            <van-field
              v-model="password"
              name="validatorPwd"
              type="password"
              placeholder="请输入密码"
              :rules="[{ validatorPwd, message: '请输入正确格式的密码' }]"
            />
          </van-cell-group>
          <div class="submit">
            <van-button @click="submit" round block type="danger" native-type="submit" >
              登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getLogin } from "../api/login";
import { ref } from "vue";
import { showNotify } from 'vant';
import { useRouter } from "vue-router";

const router = useRouter();
const phone = ref('')
const password = ref('')
// 校验函数返回 true 表示校验通过，false 表示不通过
const validatorPhone = (val) => /1\d{10}/.test(val);
const validatorPwd = (val) => /^[A-Za-z]\w{5,15}$/.test(val);

// 顶部返回
// 箭头函数
// const goback = ()=>{
//     router.back()
// }
const goback = function(){
    router.back()
}

// 提交登录信息到服务器
const submit = ()=>{
    getLogin(phone.value,password.value).then((res)=>{
        // console.log('phone,pwd',phone,password);
        // console.log('phone,pwd',phone.value,password.value);
        console.log('发送登录请求',res);
        if(res.data.code == 200){
            showNotify({type: 'success',color: 'white',background: 'green',message:res.data.msg+'！',position: 'center'})
            localStorage.setItem('token',res.data.token)
            router.back()
        }else{
            showNotify({type: 'danger',color: 'white',background: 'red',message:res.data.msg+'！',position: 'center'})
        }
    })
}
</script>

<style scoped lang="less">
.login {
    .bg{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        img{
            width: 100%;
        }
    }
  .login-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    font-size: 15px;
    .icon-fanhui {
      font-size: 21px;
    }
  }
  .login-container {
    padding: 0 15px;
    h1 {
      font-size: 28px;
      font-weight: 700;
      margin: 25px 0;
    }

    .login-box{
        .login-area{
            padding: 15px 0px;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f5f6f7;
        }
        .submit{
            
            margin: 20px 0;
            padding: 0 120px;
            /deep/.van-button {
                margin: 0 110px;
            }
        }
    }
  }
}
/deep/.van-cell-group{
    margin: 0;
    .van-cell {
        padding: 15px 0;
        border-bottom: 1px solid #f5f6f7;
    }
    .van-cell:after {
        left: 0;
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        bottom: 0;
        border-bottom: 1px solid #f5f6f7;
        transform: scaleY(.5);
    }
}
</style>