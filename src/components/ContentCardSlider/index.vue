<template>
   <div class="card-slider">
      <!-- Header -->
      <div class="slider-header">
         <!-- <h2 class="title">{{ title }}</h2>
         <span class="action" @click="refresh">
            <el-icon>
               <Refresh />
            </el-icon>
            换一批
         </span> -->
         <h2 class="title">{{ title }}</h2>
      </div>

      <!-- Cards Container -->
      <div class="slider-wrapper">
         <button class="arrow left" @click="scroll('left')">←</button>

         <div ref="sliderRef" class="slider">
            <div v-for="i in 10" :key="i" class="card-box"></div>
         </div>

         <button class="arrow right" @click="scroll('right')">→</button>
      </div>
   </div>
</template>

<script setup lang="ts" generic="T extends { id: string | number }">
import { ref } from 'vue';
const props = defineProps<{
  title: string
}>()
const sliderRef = ref<HTMLElement>()

const scroll = (direction: 'left' | 'right') => {
   if (!sliderRef.value) return
   sliderRef.value.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth'
   })
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
