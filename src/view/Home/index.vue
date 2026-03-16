<template>
   <div class="header box-shadow">
      <Header></Header>
   </div>
   <div class="container flx-center">
      <div class="carousel ">
         <Carousel></Carousel>
      </div>
      <div class="card-slider">
         <div>
            <CardSlider title="热门漫画" :items="comicList">
               <template #item="{ data }">
                  <ComicCard :id="data.id" :url="data.url" :title="data.title" :desc="data.desc" :tags="data.tags" />
               </template>
            </CardSlider>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import Header from '@/layout/Header/index.vue'
import Carousel from './components/Carousel.vue';
import CardSlider from '@/components/ContentCardSlider/index.vue';
import { ref } from 'vue'
import type { Comic } from '@/components/ComicCard/types'
const comicList = ref<Comic[]>([
   { id: 1, url: 'xxx.jpg', title: '十天的温度', desc: '在短暂的数天里...', tags: ['冷门佳作'] }
])
</script>


<style scoped lang="scss">
@import './index.scss';
</style>
