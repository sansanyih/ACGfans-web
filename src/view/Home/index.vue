<template>
   <div class="header">
      <Header></Header>
   </div>
   <div class="container flx-center">
      <div class="carousel ">
         <Carousel></Carousel>
      </div>
      <!-- <div>
         这是推荐组件的地方
      </div> -->
   </div>
</template>

<script setup lang="ts">
import Header from '@/layout/Header/index.vue'
import Carousel from './components/Carousel.vue';
</script>


<style scoped lang="scss">
@import './index.scss';
</style>
