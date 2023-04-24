<template>
    <div class="main">
        <div class="note-content">
            <van-sticky>
                <div class="top" v-if="noteContentBool.show">
                    <div class="left">
                        <span class="iconfont icon-fanhui" @click="goback"></span>
                        <div class="img">
                            <img :src="noteContent.data.user.avatar" alt="">
                        </div>
                        <p>{{noteContent.data.user.username}}</p>
                    </div>
                    <div class="right">
                        <div class="follow">
                            + 关注
                        </div>
                        <span class="iconfont icon-zhuanfa" @click="showShare = true"></span>
                        <!-- vant分享组件通过showshare点击显示分享界面-->
                        <van-share-sheet
                            v-model:show="showShare"
                            title="立即分享给好友"
                            :options="options2"
                            :overlay-style="{backgroundColor:'rgba(0,0,0,0.1)'}"
                        />
                    </div>

                </div>
            </van-sticky>

            <div class="noteinfo" v-if="noteContentBool.show">
                <div class="info-pic" v-if="noteContent.data.images!=null">
                    <div class="pic" v-for="item in noteContent.data.images">
                        <img :src="item" alt="">
                    </div>
                </div>
                <h3 class="title">{{noteContent.data.title}}</h3>
                <div class="info-content">
                    <div class="content">{{noteContent.data.content}}</div>
                </div>
                <div class="note-time">
                    {{getDistanceTime(noteContent.data.addtime *1000)}}
                </div>
            </div>

            <div class="note-comment" v-if="commentBool.show">
                <h3 class="comment-title">共 66 条评论</h3>
                <div class="yourComment">
                    <div class="comment-img">
                        <img src="https://cs.xinpianchang.com/passport/default.jpg" alt="">
                    </div>
                    <div class="comment-box">
                        说说你的看法吧~
                    </div>
                </div>
            </div>

            <ul class="comment-info" v-if="commentBool.show">
                <li v-for="item in noteComment.list" :key="item.id">
                    <div class="info-pic">
                        <img :src="item.userDetail.avatar_big" alt="">
                    </div>
                    <div class="comment-right">
                        <div class="comment-msg">
                            <div class="username">{{item.userDetail.nickname}}</div>
                            <p class="user-comment"> {{item.contentText}}
                                <span>{{getDistanceTime(timeToNum(iosTurn(item.createTime)))}}</span>
                            </p>
                            <div class="comment-son" v-if="item.parent">
                                <div class="son-img">
                                    <img :src="item.parent.userDetail.avatar_big" alt="">
                                </div>
                                <div class="son-msg">
                                    <p class="son-username">
                                        {{item.parent.userDetail.nickname}}
                                    </p>
                                    <p class="son-context">
                                        {{item.parent.contentText}}
                                        <span>{{getDistanceTime(timeToNum(iosTurn(item.parent.createTime)))}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <span class="iconfont icon-dianzan"></span>
                    </div>
                </li>
            </ul>

            <div class="nocomment" v-if="noteComment.list.length == 0">
                暂时没有更多了
            </div>

            <div class="bottom" v-if="noteContentBool.show">
                <input type="text" placeholder="说点什么吧~">
                <div class="dianzan">
                    <span class="iconfont icon-dianzan"></span>
                    {{noteContent.data.count.count_liked}}
                </div>
                <div class="pinglun">
                    <span class="iconfont icon-bijijilu"></span>
                    {{noteContent.data.count.count_commented}}
                </div>
            </div>
        </div>

    </div>

    
</template>

<script setup>
import { useRouter,useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { getNoteContent, getNoteCommment } from "../api/note";
import { Sticky } from "vant";
import { getDistanceMonth,getCurMonthDay,getDistanceTime,getNowMonth,getYearDay,iosTurn,timeToNum } from "../utils/utils";

const route = useRoute();
console.log('-------------------route--------------------',route);
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

const noteContentBool = reactive({
  show: false,
});
// 手记数据
const noteContent = reactive({
    data:{}
});

const commentBool = reactive({
  show: false,
});
//手记评论数据
const noteComment = reactive({
    list:[]
})

const goback = ()=>{
    router.back()
}

onMounted(() => {
    getNoteContent(route.query.id).then((res) => {
        // console.log(res);
        noteContent.data = res.data.data;
        console.log("手记内容数据", noteContent.data);
        noteContentBool.show = true;
    });

    getNoteCommment(route.query.id).then((res)=>{
        // console.log('手记评论数据',res);
        noteComment.list = res.data.data;
        console.log('手记评论数据',noteComment.list);
        commentBool.show = true;
    })
});

</script>

<style scoped lang="less">
.main{
    min-width: 375px;
    max-width: 750px;
    margin: 0 auto;
    height: 100%;

    .blank{
        height: 60px;
    }

    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e5e5e5;
        padding: 10px;
        background-color: #fff;
        .left{
            display: flex;
            align-items: center;
            .icon-fanhui{
                font-size: 19px;
                font-weight: 600;
                padding-left: 5px;
                padding-right: 5px;
            }
            .img{
                width: 25px;
                height: 25px;
                border-radius: 50%;
                border: 1px solid #f0f0f0;
                overflow: hidden;
                img{
                    width: 25px;
                    height: 25px;
                }
            }
            p{
                font-size: 12px;
                color: #000716;
                margin-left: 8px;
            }
        }
        .right{
            display: flex;
            align-items: center;

            .follow{
                width: 66px;
                height: 26px;
                line-height: 26px;
                text-align: center;
                border-radius: 13px;
                border: 1px solid #d14835;
                color: #d65c4a;
                font-size: 12px;
            }
            .icon-zhuanfa{
                font-size: 17px;
                margin-left: 12px;
                margin-right: 6px;
                line-height: 24px;
                // font-weight: 400;
            }
        }
    }

    .noteinfo{
        border-bottom: 1px solid #e5e6ea;
        .info-pic{
            padding-left: 16px;
            padding-top: 10px;
            padding-bottom: 9px;
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            .pic{
                width: 110px;
                height: 110px;
                border-radius: 3px;
                overflow: hidden;
                margin-right: 6px;
                margin-bottom: 6px;
                img{
                    width: 110px;
                    height: 110px;
                    object-fit: cover;
                }
            }
        }

        .title{
            line-height: 25px;
            padding: 8px 16px 0 16px;
            font-size: 15px;
            font-family: 黑体;
        }

        .info-content{

            .content{
                padding: 0 16px;
                color: #0e1624;
                font-size: 13px;
                line-height: 23px;
            }
        }
        .note-time{
            padding-left: 16px;
            font-size: 12px;
            line-height: 12px;
            color: #aaafb9;
            margin: 16px 0;
        }
    }

    .note-comment{
        padding: 0 16px;
        .comment-title{
            height: 49px;
            line-height: 49px;
            font-size: 13px;
            color: #4d5561;
        }
        .yourComment{
            display: flex;
            .comment-img{
                width: 34px;
                height: 34px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 34px;
                    height: 34px;
                }
            }
            .comment-box{
                margin-left: 10px;
                margin-bottom: 5px;
                height: 34px;
                line-height: 34px;
                border-radius: 17px;
                flex: 1;
                background-color: #f3f4f5;
                padding-left: 15px;
                color: #9da2ae;
                font-size: 13px;
            }
        }
    }

    .comment-info{
        padding-left: 16px;
        li{
            display: flex;
            margin-top: 15px;
            .info-pic{
                width: 32px;
                height: 32px;
                border-radius: 50%;
                overflow: hidden;
                margin-top: 2px;
                img{
                    width: 32px;
                    height: 32px;
                }
            }
            .comment-right{
                margin-left: 12px;
                padding-bottom: 15px;
                padding-right: 16px;
                display: flex;
                flex: 1;
                justify-content: space-between;
                .comment-msg{
                    margin-right: 20px;
                    .username{
                        height: 22px;
                        line-height: 22px;
                        font-size: 13px;
                        color: #9da2ae;     
                    }
                    .user-comment{
                        line-height: 19px;
                        font-size: 13px;
                        color: #212936;
                        span{
                            display: inline-block;
                            color: #9da2ae;
                            font-size: 12px;
                            transform: scale(.9);
                        }
                    }

                    .comment-son{
                        display: flex;
                        margin-top: 16px;

                        .son-img{
                            width: 23px;
                            height: 23px;
                            border-radius: 50%;
                            overflow: hidden;
                            img{
                                width: 23px;
                                height: 23px;
                            }
                        }

                        .son-msg{
                            margin-left: 10px;
                            .son-username{
                                height: 20px;
                                line-height: 20px;
                                font-size: 12px;
                                color: #9da2ae;
                            }

                            .son-context{
                                line-height: 19px;
                                font-size: 13px;
                                color: #212936;
                                span{
                                    display: inline-block;
                                    color: #9da2ae;
                                    font-size: 12px;
                                    transform: scale(.9);
                                }
                            }
                        }
                    }
                }

                .icon-dianzan{

                }
            }
        }
    }

    .nocomment{
        width: 100%;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        color: #a1a1a1;
    }

    .bottom{
        width: 100%;
        height: 45px;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #fefefe;
        border-top: 1px solid #d1d4da;
        display: flex;
        align-items: center;
        input{
            flex: 1;
            background-color: #f3f4f5;
            height: 34px;
            line-height: 34px;
            padding-left: 20px;
            font-size: 13px;
            border: none;
            margin: 0 16px;
            border-radius: 17px;
        }
        .dianzan,.pinglun{
            padding-left: 5px;
            padding-right: 10px;
            font-size: 12px;
            // line-height: 40px;

            .icon-dianzan,.icon-bijijilu{
                font-size: 16px;
            }
        }
    }
}
</style>