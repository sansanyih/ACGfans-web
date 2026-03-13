<template>
  <div class="tab-list" ref="tabListRef">
    <div
      v-for="(item, index) in tabs"
      :key="item.name"
      class="tab-item"
      :class="{ active: activeIndex === index }"
      @click="handleClick(index, $event)"
    >
      <span class="tab-text">{{ item.label }}</span>
      <span class="tab-ripple"></span>
    </div>
    <div class="tab-line" :style="lineStyle"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const tabs = [
  { label: '首页', name: 'home' },
  { label: '游戏折扣', name: 'discount' },
  { label: '抽奖', name: 'lottery' },
  { label: '广场', name: 'discuss' },
  { label: '分享游玩记录', name: 'share' },
]

const activeIndex = ref(0)
const tabListRef = ref<HTMLElement>()
const itemWidths = ref<number[]>([])

// 计算下划线位置和宽度
const lineStyle = computed(() => {
  const index = activeIndex.value
  const left = itemWidths.value
    .slice(0, index)
    .reduce((sum, w) => sum + w, 0)
  const width = itemWidths.value[index] || 0
  return {
    transform: `translateX(${left}px)`,
    width: `${width}px`,
  }
})

// 触发遮罩动画
const triggerRipple = (el: HTMLElement) => {
  const ripple = el.querySelector('.tab-ripple') as HTMLElement
  if (!ripple) return
  ripple.style.animation = 'none'
  void ripple.offsetHeight
  ripple.style.animation = 'ripple-effect 0.4s ease-out'
}

// 计算每个 tab 的宽度
const calcWidths = () => {
  if (!tabListRef.value) return
  const items = tabListRef.value.querySelectorAll('.tab-item')
  itemWidths.value = Array.from(items).map((el) => (el as HTMLElement).offsetWidth)
}

// 点击处理
const handleClick = (index: number, event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  triggerRipple(target)
  activeIndex.value = index
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  calcWidths()
  if (window.ResizeObserver && tabListRef.value) {
    resizeObserver = new ResizeObserver(calcWidths)
    resizeObserver.observe(tabListRef.value)
  } else {
    window.addEventListener('resize', calcWidths)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  } else {
    window.removeEventListener('resize', calcWidths)
  }
})
</script>

<style scoped lang="scss">
@import '../index.scss';
</style>
