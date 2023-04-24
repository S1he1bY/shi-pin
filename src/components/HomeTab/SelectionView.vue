<template>
    <div class="main">
        <div class="selection" v-if="selectBool.show">
            <div class="select-title">
                <h3>{{ selectTitle.dataTitle.title.model.title }}</h3>
            </div>

            <div class="select-info" v-for="item in selectData.list" :key="item.children[0].model.resource.id" @click="goVideo(item.children[0].model.resource.id)">
                <!-- 个人信息 -->
                <div class="select-top">
                    <div class="userinfo">
                        <div class="user-img">
                            <img :src="item.children[0].model.resource.author.userinfo.avatar" alt="">
                        </div>
                        <p> {{ item.children[0].model.resource.author.userinfo.username }} </p>
                    </div>
                    <span class="iconfont icon-gengduo-shuxiang"></span>
                </div>
                <p class="select-title">{{item.children[0].model.resource.title}}</p>

                <!-- 精选图片 -->
                <div class="select-pic">
                    <img :src="item.children[0].model.resource.cover" alt="">
                    <div class="pic-desc">
                        <p> {{formatWatch(item.children[0].model.resource.count.count_view)}} 观看 | {{formatTime(item.children[0].model.resource.duration)}} </p>
                    </div>
                </div>

                <!-- 底部三连 -->
                <div class="bottom-sanlian">
                    <div class="bottom-collect">
                        <span class="iconfont icon-shoucang"></span>
                        {{item.children[0].model.resource.count.count_collect}}
                        <!-- <p>522</p> -->
                    </div>
                    <div class="bottom-comment">
                        <span class="iconfont icon-bijijilu"></span>
                        {{item.children[0].model.resource.count.count_comment}}
                        <!-- <p>522</p> -->
                    </div>
                    <div class="bottom-like">
                        <span class="iconfont icon-dianzan"></span>
                        {{item.children[0].model.resource.count.count_like}}
                        <!-- <p>522</p> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="blank"></div>
    </div>
</template>
  
<script setup>
import { getSelection } from '../../api/select'
import { useRouter } from 'vue-router';
import { reactive,onMounted, ref } from 'vue';
import {formatWatch,formatTime} from '../../utils/utils'

const router = useRouter()

const selectBool = reactive({
    show:false
})

// 标题数据(练练手，可以直接写一个死标题，反正也只有标题)
const selectTitle = reactive({
    dataTitle:{}
})

//每日精选数据
const selectData = reactive({
    list:[]
})

//跳转视频
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

onMounted(()=>{
    getSelection().then((res)=>{
        // console.log('每日精选数据',res);
        var data = res.data.data.children
        console.log('每日精选数据',data);
        // 处理每日精选数据
        data.forEach( item => {
            if(item.type == 'uiBigCard'){
                selectData.list.push(item);
            }
        });
        console.log('处理后只剩精选数据',selectData.list);


        // 拿标题数据i
        // 找索引号（只有一个标题）
        var titleIndex = data.findIndex((item)=> item.type == 'mTitle');
        // console.log(titleIndex);
        selectTitle.dataTitle.title = data[titleIndex]
        console.log('标题数据',selectTitle.dataTitle.title);

        //确认拿完数据 拿这个做判断，拿完数据再渲染页面
        selectBool.show = true;

    })
})
</script>
  
<style scoped lang="less">
.main{
    min-width: 375px;
    max-width: 750px;
    margin: 0 auto;
    height: 100%;
    .selection{
        width: 100%;
        height: 100%;
        background-color: #f7f7f7;
        h3{
            height: 44px;
            line-height: 44px;
            font-size: 18px;
            color: rgb(0, 0, 0);
            padding-left: 12px;
            padding-top: 7px;
            font-weight: 600;
            font-family: 黑体;
        }

        .select-info{
            width: 93.6%;
            background-color: #fff;
            margin: 5px auto;
            border-radius: 5px;;
            .select-top{
                display: flex;
                align-items: center;
                padding: 10px 10px 3px 10px;
                .userinfo{
                    width: 94%;
                    display: flex;
                    align-items: center;
                    .user-img{
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        overflow: hidden;
                        img{
                            width: 32px;
                            height: 32px;
                        }
                    }
                    p{
                        margin-left: 8px;
                        font-size: 12px;
                        color: #212121;
                    }
                    .icon-gengduo-shuxiang{
                        font-size: 12px;
                        color: #8f8f8f;
                    }
                }
            }
            .select-title{
                height: 34px;
                line-height: 34px;
                font-size: 14px;
                padding-left: 16px;
            }
            
            .select-pic{
                width: 100%;
                overflow: hidden;
                position: relative;
                img{
                    width: 100%;
                }
                .pic-desc{
                    position: absolute;
                    right: 13px;
                    bottom: 8px;
                    p{
                        color: white;
                        height: 28px;
                        line-height: 28px;
                        font-size: 12px;
                        color: hsla(0,0%,100%,.9);
                    }
                }
            }

            .bottom-sanlian{
                display: flex;
                
                .bottom-collect,.bottom-comment,.bottom-like{
                    flex: 1;
                    // display: flex; 用了p标签的话
                    align-items: center;
                    // height: 38px;
                    // line-height: 38px;
                    padding: 10px 0; 
                    text-align: center;
                    font-size: 12px;
                }
                
            }
        }
    }

    .blank{
        height: 50px;
    }
}
</style>