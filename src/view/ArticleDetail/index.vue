<template>
   <div class="article-detail-page">
      <Header />
      
      <div class="article-container" v-if="article">
         <!-- 文章标题 -->
         <h1 class="article-title">{{ article.title }}</h1>
         
         <!-- 文章元信息 -->
         <div class="article-header">
            <div class="meta-left">
               <span class="date">
                  <el-icon><Calendar /></el-icon>
                  {{ article.publishDate }}
               </span>
               <span class="read-count">
                  <el-icon><View /></el-icon>
                  {{ article.readCount }}次阅读
               </span>
               <span class="like-count">
                  <el-icon><Pointer /></el-icon>
                  {{ article.likeCount }}人点赞
               </span>
            </div>
         </div>

         <!-- 作者信息 -->
         <div class="author-card">
            <el-image class="author-avatar" :src="article.authorAvatar" fit="cover">
               <template #error>
                  <div class="avatar-placeholder">{{ article.author.charAt(0) }}</div>
               </template>
            </el-image>
            <div class="author-info">
               <div class="author-name-row">
                  <span class="name">{{ article.author }}</span>
                  <span class="level">Lv.2</span>
                  <span class="badge">编辑者</span>
               </div>
               <p class="author-bio">我们的理想必将实现</p>
            </div>
         </div>

         <!-- 文章内容 -->
         <div class="article-content">
            <p v-for="(paragraph, index) in contentParagraphs" :key="index">
               {{ paragraph }}
            </p>
         </div>

         <!-- 评论区 -->
         <div class="comment-section">
            <h3 class="section-title">留言板</h3>
            <div class="comment-list">
               <div v-for="comment in article.comments" :key="comment.id" class="comment-item">
                  <div class="comment-header">
                     <el-image class="comment-avatar" :src="article.authorAvatar" fit="cover">
                        <template #error>
                           <div class="avatar-placeholder">{{ comment.user.charAt(0) }}</div>
                        </template>
                     </el-image>
                     <div class="comment-user">
                        <span class="username">{{ comment.user }}</span>
                        <span class="level">Lv.2</span>
                        <span class="badge">编辑者</span>
                     </div>
                  </div>
                  <div class="comment-content">
                     <p v-for="(p, i) in comment.content.split('\n')" :key="i">{{ p }}</p>
                  </div>
                  <div class="comment-footer">
                     <span class="comment-date">{{ comment.date }}</span>
                     <button class="reply-btn">
                        <el-icon><ChatDotRound /></el-icon>
                        回复
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <Footer />
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Calendar, View, Pointer, ChatDotRound } from '@element-plus/icons-vue'
import Header from '@/layout/Header/index.vue'
import Footer from '@/layout/Footer/index.vue'
import { articleApi, type ArticleDetail } from '@/api/modules/article'

const route = useRoute()
const article = ref<ArticleDetail | null>(null)

// 将内容按段落分割
const contentParagraphs = computed(() => {
   if (!article.value) return []
   return article.value.content.split('\n\n').filter(p => p.trim())
})

const fetchArticleDetail = async () => {
   const id = Number(route.params.id)
   if (!id) return
   
   try {
      const data = await articleApi.getById(id)
      article.value = data
   } catch (error) {
      console.error('获取文章详情失败:', error)
   }
}

onMounted(() => {
   fetchArticleDetail()
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>