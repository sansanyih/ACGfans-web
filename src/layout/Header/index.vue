<template>
   <div class="header">
      <div class="header-lf">
         <Icon id="icon"></Icon>
         <Tab id="tab"></Tab>
      </div>
      <div class="header-ri">
         <Button></Button>
      </div>
   </div>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import Tab from './components/Tab.vue'
import Icon from './components/Icon.vue'
import Button from './components/Button.vue'

</script>


<style scoped lang="scss">
@import './index.scss';
</style>