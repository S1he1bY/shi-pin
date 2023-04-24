<template>
    <div class="searchall">
        <div class="search-index" v-if="isSearch">
            <form action="/">
                <van-search
                    v-model="value"
                    show-action
                    placeholder="请输入搜索关键词"
                    @click-input="toEffect()"
                    
                />
            </form>
            <!-- 轮播图 -->
            <div class="search-banner" v-if="searchBool.show">
                <van-swipe autoplay="3000">
                    <van-swipe-item v-for="item in searchPage.list.banners" :key="item.id">
                        <img :src="item.cover" class="bannerImg" alt="" />
                        <div class="search-title">{{ item.title }}</div>
                    </van-swipe-item>
                    <template #indicator="{ active, total }">
                        <div class="custom-indicator">{{ active + 1 }} / {{ total }}</div>
                    </template>
                </van-swipe>
            </div>


            <!-- 四个图标 -->
            <div class="searchPosition" v-if="searchBool.show">
                <div class="block" v-for="item in searchPage.list.recommended_position">
                    <div class="block-img">
                        <img :src="item.icon" alt="">
                    </div>
                    <p>{{item.title}}</p>
                </div>
            </div>

            <!-- 筛选 -->
            <div class="search-works" v-if="searchBool.show">
                <h3>作品</h3>
                <ul>
                    <li v-for="item in searchPage.list.categories" :key="item.id" @click="toType(item.id,item.category_name)">
                        <img :src="item.cover" alt="">
                        <p>{{item.category_name}}</p>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 搜索筛选页面 -->
        <div class="search-category" v-else>
            <van-sticky>
                <div class="category-top">
                    <span class="iconfont icon-fanhui" @click="back"></span>
                    <h3>{{ title }}</h3>
                    <!-- searchPage.list.categories.category_name      id? -->
                    <!-- category.list[item].categories[?id].category_name -->
                </div>
            </van-sticky>
            <SimilarView :List="category.list" :name="category.list"></SimilarView>
            <div class="blank-2">
            </div>
        </div>
        
        <div class="blank">
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted, reactive, } from 'vue';
import { Sticky } from "vant";
import { useRouter } from 'vue-router';
import { searchIndex,searchType } from '../api/search';
import SimilarView from '../components/HomeTab/SimilarView.vue';

const title = ref('')
const router = useRouter()
const value = ref('');
const toEffect = ()=>{
    router.push({
      path:'/searcheffect'
  })
}

// 搜索页面数据
const searchPage = reactive({
    list:[]
})
const searchBool = reactive({
    show:false
})

// 搜索分类的数据
const category = reactive({
    list:[]
})

// 是否点击了分类内容
var isSearch = ref(1)

const toType = (id,name)=>{
    // 拿到每一个分类的id，根据id来查分类内容的数据
    console.log('筛选分类id',id);
    searchType(id).then((res)=>{
        // console.log('分类内容1',res);
        category.list = res.data.data.list;
        console.log('分类内容',category.list);
        isSearch.value = 0
    })

    title.value = name
}

//返回搜索页面
const back = ()=>{
    router.push({
        path:'/search'
    }).then(()=>{
        router.go(0)
    })
}

onMounted(()=>{
    searchIndex().then((res)=>{
        // console.log(res);
        searchPage.list = res.data.data
        console.log('搜索页面的数据',searchPage.list);
        searchBool.show = true
    })
    
})

</script>

<style scoped lang="less">
.blank-2{
    height: 60px;
}
    .search-index{
        // padding: 10px 12px;
        background: #f7f7f7;

        // 轮播图
        .search-banner{
            margin: 10px;
            overflow: hidden;
            border-radius: 10px;
            img{
                width: 100%;
            }
            .search-title{
                position: absolute;
                bottom: 13px;
                left: 16px;
                color: white;
                font-size: 15px;
            }
            .custom-indicator {
                position: absolute;
                right: 13px;
                bottom: 12px;
                padding: 2px 5px;
                font-size: 15px;
                color: white;
            }

                .custom-indicator > span {
                font-size: 17px;
                font-weight: 700;
            }
        }

        // 四个图标
        .searchPosition{
            display: flex;
            justify-content: space-around;
            margin-top: 18px;
            margin-bottom: 7px;

            .block{
                .block-img{
                    display: flex;
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    box-shadow: 0 0 11px 0 #bababa;
                    // position: relative;
                    img{
                        width: 23px;
                        margin: auto;
                        // width: 23px;
                        // position: absolute;
                        // left: 12px;
                        // top: 8px;
                    }
                }
                p{
                    font-size: 12px;
                    text-align: center;
                    color: #010101;
                    margin: 10px 0;
                }
            }
        }

        // 作品
        .search-works{
            h3{
                font-size: 16px;
                font-family: 黑体;
                font-weight: 700;
                margin-left: 12px;
                margin-bottom: 10px;
            }
            ul{
                display: flex;
                width: 93%;
                justify-content: space-between;
                flex-wrap: wrap;
                margin: 0 auto;

                li{
                    width: 49%;
                    // border-radius: 5px;
                    overflow: hidden;
                    margin-bottom: 15px;
                    position: relative;
                    
                    img{
                        width: 100%;
                        border-radius: 5px;
                    }
                    p{
                        position: absolute;
                        left: 15px;
                        top: 15px;
                        color: white;
                        font-size: 12px;
                        font-weight: 700;
                    }
                }
            }
        }
        .blank {
            height: 80px;
        }
    }
    .category-top{
        display: flex;
        // position: sticky;
        // justify-content: space-between;
        // flex: 1;
        width: 100%;
        height: 42px;
        align-items: center;
        background-color: #fff;
        border-bottom: 1px solid #f7f7f7;

        .icon-fanhui{
            font-size: 18px;
            font-weight: 700;
            padding-left: 20px;
        }
        h3{
            position: absolute;
            left: 41%;
        }
    }
</style>