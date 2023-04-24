<template>  
  <div class="index">
    <van-tabbar class="tabbar" v-model="active"  active-color="red" inactive-color="#bbb" route>
      <van-tabbar-item v-for="item in tabbarList" :key="item.id" :to="item.path">
        <span>{{ item.text }}</span>
        <template #icon="props">
          <i :class="active == item.id ? `iconfont ${item.icon} active`:`iconfont ${item.icon} inactive` "></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { ref,reactive, onMounted} from "vue";
import { useRoute } from 'vue-router';
const active = ref(1);
const tabbarList = reactive([
    {
        id:0,
        path:'/home',
        icon:'icon-shouye',
        text:'首页'
    },{
        id:1,
        path:'/search',
        icon:'icon-sousuo-xianxing',
        text:'搜索'
    },{
        id:2,
        path:'/note',
        icon:'icon-bijijilu',
        text:'手记'
    },{
        id:3,
        path:'/user',
        icon:'icon-wode',
        text:'我的'
    },
]);
onMounted(() => {
  // console.log(useRoute());
  var index = tabbarList.findIndex((item)=> item.path == useRoute().path)
  active.value = index
})
</script>



<style scoped>
.tabbar{
  z-index: 999;
}
  .active{
      color:red;
      font-size: 24px;
  }
  .inactive{
    color: #bbb;
    font-size: 18px;
  }
</style>