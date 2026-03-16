<template>
   <div class="cardSlider">
      <div class="header">
         <!-- 左侧标题 -->
         <div class="header-left">
            <slot name="title">
               <h2 class="default-title">{{ title }}</h2>
            </slot>

         </div>
         <!-- 右侧操作 -->
         <div class="header-right">
               <span class="default-action">
                  <el-icon>
                     <slot name="icon">
                     </slot>
                  </el-icon>
                  {{ description }}
               </span>
         </div>
      </div>
      <div>
         <el-carousel>
            <el-carousel-item v-for="item in props.items" :key="item.id">
               <slot name="item" :data="item">
               </slot>
            </el-carousel-item>
         </el-carousel>
      </div>
   </div>
</template>
<script setup lang="ts" generic="T extends { id: string | number }">
interface Props {
   title?: string
   description?: string
   items: T[]           // 使用泛型数组
}

const props = defineProps<Props>()

</script>
<style scoped lang="scss"></style>
