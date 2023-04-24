<template>
  <!-- v-if="isRouteAlive" -->
  <router-view ></router-view>
  
</template>
<script setup>
/* import { nextTick, provide, ref } from "vue";
const isRouteAlive = ref(true)
const reload = () =>{
  isRouteAlive.value = false;
  nextTick(()=>{
    isRouteAlive.value = true
  })
}
provide('reload',reload) */
</script>


<style scoped>

</style>
