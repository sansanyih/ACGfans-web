<template>
  <div class="header-actions flex-center">
    <button class="action-button">
      <Search class="action-icon"  />
    </button>
    <button class="action-button flex-center">
      <Sunny class="action-icon" />
    </button>
    <button class="action-button flex-center">
      <Cpu class="action-icon" />
    </button>
    
  </div>
</template>

<script lang="ts" setup>
import { Cpu, Search, Sunny } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
@import '../index.scss';
</style>

