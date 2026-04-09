<template>
   <div class="login-page">
      <div class="login-container">
         <h1 class="login-title">欢迎登录</h1>
         
         <el-form 
            ref="formRef"
            :model="loginForm"
            :rules="rules"
            class="login-form"
         >
            <el-form-item prop="username">
               <el-input 
                  v-model="loginForm.username"
                  placeholder="用户名/邮箱"
                  size="large"
               >
                  <template #prefix>
                     <el-icon><User /></el-icon>
                  </template>
               </el-input>
            </el-form-item>
            
            <el-form-item prop="password">
               <el-input 
                  v-model="loginForm.password"
                  type="password"
                  placeholder="密码"
                  size="large"
                  show-password
               >
                  <template #prefix>
                     <el-icon><Lock /></el-icon>
                  </template>
               </el-input>
            </el-form-item>
            
            <el-form-item>
               <el-button 
                  type="primary" 
                  size="large"
                  class="login-btn"
                  :loading="loading"
                  @click="handleLogin"
               >
                  登录
               </el-button>
            </el-form-item>
            
            <div class="login-options">
               <el-checkbox v-model="rememberMe">记住我</el-checkbox>
               <a href="#" class="forgot-link">忘记密码？</a>
            </div>
         </el-form>
         
         <div class="register-link">
            还没有账号？<a href="#">立即注册</a>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const formRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const loginForm = ref({
   username: '',
   password: ''
})

const rules = {
   username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
   ],
   password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码至少6位', trigger: 'blur' }
   ]
}

const handleLogin = async () => {
   await formRef.value.validate()
   
   loading.value = true
   try {
      // 这里调用你的登录 API
      // const res = await loginApi.login(loginForm.value)
      
      // 模拟登录成功
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      userStore.login('mock_token', {
         id: 1,
         username: loginForm.value.username,
         avatar: '',
         level: 2
      })
      
      // 如果有重定向地址，跳回去
      const redirect = route.query.redirect as string
      router.push(redirect || '/')
   } catch (error) {
      console.error('登录失败:', error)
   } finally {
      loading.value = false
   }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
