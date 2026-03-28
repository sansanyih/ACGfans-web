<template>
   <div class="home">
      <!-- 头部 -->
      <div class="header box-shadow">
         <Header></Header>
      </div>
      <!-- 中间推荐部分 -->
      <div class="container flx-center">
         <div class="carousel ">
            <Carousel></Carousel>
         </div>
         <div class="card-slider">
            <div>
               <CardSlider title="随机推荐">
               </CardSlider>
            </div>
         </div>
         <div class="card-slider">
            <div>
               <CardSlider title="近期新作">
               </CardSlider>
            </div>
         </div>
         <div class="card-slider">
            <div>
               <CardSlider title="即将发布">
               </CardSlider>
            </div>
         </div>
      </div>
      <!-- 三个标签页 -->
      <div class="banner-container flx-center">
         <div v-for="item in bannerList" :key="item.id" class="banner-item">
            <a v-if="item.link" :href="item.link">
               <el-image style="width: 43em; height: 320px" />
            </a>
         </div>
      </div>
      <!-- 最新文章 -->
      <div>
         <div class="left-container">
            <div class="article">
            </div>
            <div class="radio">
            </div>
            <div class="link">
            </div>
         </div>
         <div class="right-container">
            <div>

            </div>
         </div>
      </div>
      <div>
         <Footer/>
      </div>
   </div>

</template>

<script setup lang="ts">
import Header from '@/layout/Header/index.vue'
import Carousel from './components/Carousel.vue';
import CardSlider from '@/components/ContentCardSlider/index.vue';
import Footer from'@/layout/Footer/index.vue'
// 下面是模拟的数据，暂时还没有加上api
import { ref } from 'vue';
interface BannerItem {
   id: number | string
   imageUrl: string
   link?: string  // 可选的跳转链接
}
const bannerList = ref<BannerItem[]>([
   { id: 1, imageUrl: 'https://example.com/banner1.jpg', link: '/page1' },
   { id: 2, imageUrl: 'https://example.com/banner2.jpg', link: '/page2' },
   { id: 3, imageUrl: 'https://example.com/banner3.jpg', link: '/page3' }
])
</script>


<style scoped lang="scss">
@import './index.scss';
</style>
