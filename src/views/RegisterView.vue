<script setup>
import { ref } from 'vue';
import { register } from '../api/login'
import { showNotify } from 'vant';
import { useRouter } from 'vue-router';
// 校验函数返回 true 表示校验通过，false 表示不通过
const validatorPhone = (val) => /1\d{10}/.test(val);
const validatorPass = (val) => /^[A-Za-z]\w{5,15}$/.test(val);
const validatorNickname = (val) => /^[\w\u4e00-\u9fa5]{1,10}$/.test(val);

const phone = ref('');
const password = ref('');
const nickname = ref('');
const router = useRouter()


// 提交账户信息到服务器
const registerSubmit = () => {
    register(nickname.value,phone.value, password.value).then(res => {
        console.log('发起注册请求', res);

        if(res.data.code == 100){
            showNotify({ type: 'success',color: 'white',background: 'green',message: res.data.msg+'！',position: 'center' });
            localStorage.setItem('token',res.data.token)
            router.back()
        }else{
            showNotify({ type: 'danger',color: 'white',background: 'red',message: res.data.msg+'！',position: 'center' });
        }
        
    })

}

const back = ()=>{
    router.back()
}
</script>
<template>

<div class="register">
        <div class="top">
            <span @click="back" class="iconfont icon-fanhui"></span>
            <span></span>
        </div>
        <div class="bg">
            <img src="../assets/images/login-bg.png" alt="">
        </div>
        <div class="contailer">
            <h1>注册</h1>

            <div class="form-box">
                <van-form @submit="registerSubmit">
                    <van-cell-group inset>
                        <div class="area">
                            <span>中国大陆 +86</span>
                            <span> &gt; </span>
                        </div>
                        <!-- 通过 validator 进行函数校验 -->
                        <van-field v-model="nickname" name="validatorNickname" placeholder="请输入用户昵称"
                            :rules="[{ validator: validatorNickname, message: '请输入正确的用户昵称' }]" />

                        <van-field v-model="phone" name="validatorPhone" placeholder="请输入手机号"
                            :rules="[{ validator: validatorPhone, message: '请输入正确的手机号' }]" />

                        <van-field class="pass" type="password" v-model="password" name="validatorPass" placeholder="请输入密码"
                            :rules="[{ validator: validatorPass, message: '请输入正确格式的密码' }]" />
                    </van-cell-group>
                    <div class="submit">
                        <van-button round type="danger" native-type="submit">注册</van-button>
                    </div>
                </van-form>
            </div>
        </div>
    </div>
    
</template>
<style scoped lang="less">
.register {
    .top {
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
        font-size: 15px;
    }

    .bg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        img {
            width: 100%;
        }
    }

    .contailer {
        padding: 0 15px;

        h1 {
            font-size: 28px;
            font-weight: 700;
            margin: 25px 0;
        }

        .pass {

            border-bottom: 1px solid #f5f6f7;
        }

        .submit {
            display: flex;
            flex-direction: row-reverse;
            margin: 20px 0;

            /deep/.van-button {
                padding: 0 30px;
            }

        }
    }
}

/deep/.van-cell-group {
    margin: 0;

    .van-field {
        padding: 15px 0;
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

.area {
    padding: 15px 0px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f5f6f7;
    font-size: 15px;
}
</style>