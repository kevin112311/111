<template>
  <div class="user-auth-widget">
    <!-- 已登录状态 -->
    <div v-if="token" class="user-dropdown">
      <div class="user-name" @click="toggleDropdown">
        {{ userName }}
        <span class="dropdown-arrow">▼</span>
      </div>
      <div v-if="showDropdown" class="dropdown-menu">
        <div class="dropdown-item" @click="navigateToSettings">
          <i class="icon-settings"></i> 个人设置
        </div>
        <div class="dropdown-item" @click="handleLogout">
          <i class="icon-logout"></i> 退出登录
        </div>
      </div>
    </div>
    
    <!-- 未登录状态 -->
    <button v-else class="login-button" @click="navigateToLogin">
      登录
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = ref(null) 
const userName = ref('')
const showDropdown = ref(false)

// 检查本地存储中的token
onMounted(() => {
  const storedToken = localStorage.getItem('token')
  if (storedToken) {
    token.value = storedToken
    // 假设token包含用户信息，这里需要根据你的实际token结构解析
    try {
      const payload = JSON.parse(atob(storedToken.split('.')[1]))
      userName.value = payload.name || '用户'
    } catch (e) {
      console.error('Token解析错误:', e)
    }
  }
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const navigateToLogin = () => {
  router.push('/login')
}

const navigateToSettings = () => {
  showDropdown.value = false
  router.push('/settings')
}

const handleLogout = () => {
  // 清除token
  localStorage.removeItem('token')
  token.value = null
  showDropdown.value = false
  // 可以添加重定向到首页或其他逻辑
  router.push('/')
}
</script>

<style scoped>
.user-auth-widget {
  position: relative;
  display: inline-block;
}

.user-dropdown {
  cursor: pointer;
}

.user-name {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.dropdown-arrow {
  font-size: 0.8em;
  margin-left: 4px;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 120px;
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.login-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #45a049;
}
</style>
<script>
export default {
  name: 'Log-view',
};
</script>