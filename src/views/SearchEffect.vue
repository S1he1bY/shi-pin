<template>
  <div class="search">
    <form action="/" class="search-form">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        :clearable = false
        @search="onSearch"
        @cancel="onCancel"
      />
      <span class="iconfont icon-cha" @click="goHotSearch"></span>
    </form>
    <!-- 没点回车 -->
    <div class="search-recommend" v-if="isSearching">
        <div class="search-history" v-if="history.list.length>0">
            <div class="history-title">
                <h3>历史记录</h3>
                <span class="iconfont icon-shanchu" @click="deleteHistory"></span>
            </div>
            <div class="history-list">
                <div class="history-item" v-for="item in history.list" :key="item.id" @click="fastSearch(item)">
                    {{item}}
                </div>
            </div>
        </div>

        <div class="hot-kw">
            <h3>热门搜索</h3>
            <ul class="hot-list">
                <li class="hot-item" v-for="item in hotWord.list" :key="item.id" @click="fastSearch(item.name)">{{ item.name}}</li>
            </ul>
        </div>
    </div>
    <!-- 搜索结果页 -->
    <div class="search-result" v-else>
      <van-tabs v-model:active="active" title-inactive-color="#868686" color="red">
        <van-tab title="作品">
            <SimilarView v-if="searchBool.show" :List="searchResult.list"></SimilarView>
        </van-tab>
        <van-tab title="创作人">内容 2</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted,watch} from "vue";
import { useRouter } from "vue-router";
import { getSearch,getHotKw } from "../api/search";
import SimilarView from "../components/HomeTab/SimilarView.vue";

const router = useRouter();
const active = ref(0);
var isSearching = ref(1);
const value = ref("");

// 搜索数据
const searchResult = reactive({
    list:[]
})

//搜索热门关键词
const hotWord = reactive({
    list:[]
})

const searchBool = reactive({
    show:false
})

// 搜索历史记录
const history = reactive({
    list:[]
})

// 监听有没有搜索，在搜索拿历史记录
watch(isSearching,(newValue,oldValue)=>{
    console.log('newValue',newValue);
    if(newValue){
        history.list = JSON.parse(localStorage.getItem('historyList')) || []
        console.log('历史记录数据history.list',history.list);
    }
})

// 热门关键词快速搜索
const fastSearch = (name) => {
    addHistory(name)
    value.value = name
    getSearch(name).then((res)=>{
        // console.log('点击关键字结果',res);
        isSearching.value = 0
        //拿到关键字搜索后的数据
        searchResult.list = res.data.data.list
        console.log('点击热门关键字搜索结果',searchResult.list);
        searchBool.show = true
    })
}

// 打字搜索
const onSearch = () => {
    console.log('value.value',value.value); //打字输入搜索框的文字
    addHistory(value.value)
    // 向服务器请求搜索结果
    getSearch(value.value).then((res)=>{
        // console.log('搜索结果',res);
        isSearching.value = 0
        searchResult.list = res.data.data.list
        console.log('搜索结果',searchResult.list);
        searchBool.show = true
    })

};
// 取消返回搜索页面
const onCancel = () => {
    router.push({
        path:'/search'
    }).then(()=>{
        router.go(0)
    })
};

// 点小叉叉返回热门页面
const goHotSearch = ()=>{
    isSearching.value = 1
}
// 搜索添加历史记录
const addHistory = (value) =>{
    var history = JSON.parse(localStorage.getItem('historyList')) 
    var arr = history || []
    arr.push(value)
    if(history){
        arr = [...new Set(arr)]
    }
    localStorage.setItem('historyList',JSON.stringify(arr))
}

//删除历史记录
const deleteHistory = () =>{
    localStorage.removeItem('historyList')
    history.list = []
}

onMounted(()=>{
    getHotKw().then((res)=>{
        // console.log('热门',res);
        hotWord.list = res.data.data.list
        console.log('热门关键词',hotWord.list);
    })
})
</script>

<style scoped lang="less">
.search{
    .search-box{
        border-bottom: 1px solid #e8e8e8;
    }
    .search-form{
        position: relative;
        .icon-cha{
            position: absolute;
            right: 55px;
            bottom: 21px;
            font-size: 12px;
            opacity:0.4;
        }
    }

    .search-recommend{
        padding:  0 15px;
        .hot-kw{
            margin: 10px 0;

            h3{
                font-size: 13px;
                color: #a3a3a3;
            }
            .hot-list{
                display: flex;
                flex-wrap: wrap;
                .hot-item{
                    font-size: 12px;
                    color: #505050;
                    background: #f7f7f7;
                    padding: 10px 15px;
                    margin: 7px 10px 10px 0;
                    border-radius: 5px;
                }
            }
        }

        .search-history{
            padding:  10px 5px;
            
            .history-title{
                display: flex;
                justify-content: space-between;

                h3{
                    font-size: 13px;
                    color: #a3a3a3;
                }
                .icon-shanchu{
                    color: #a3a3a3;
                    font-size: 15px;
                }
            }

            .history-list{
                display: flex;
                flex-wrap: wrap;
                .history-item{
                    font-size: 12px;
                    color: #505050;
                    background: #f7f7f7;
                    padding: 10px 15px;
                    margin: 7px 10px 10px 0;
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>