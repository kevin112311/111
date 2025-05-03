<template>
  <div class="settings-container">
    <!-- 没有Token时显示错误 -->
    <div v-if="!hasToken" class="error-message">
      <h2>未登录</h2>
      <p>请先登录后再访问个人设置</p>
      <button @click="goToLogin" class="login-btn">前往登录</button>
    </div>

    <!-- 有Token时显示设置内容 -->
    <div v-else class="settings-card">
      <h2 class="settings-title">个人设置</h2>
      
      <div class="settings-form">
        <!-- 邮箱显示（不可编辑） -->
        <div class="form-group">
          <label>邮箱</label>
          <div class="static-field">{{ user.email }}</div>
        </div>
        
        <!-- 用户名编辑 -->
        <div class="form-group">
          <label>用户名</label>
          <div class="editable-field">
            <input
              v-if="editing.username"
              v-model="editForm.username"
              type="text"
              class="form-input"
              ref="usernameInput"
              style="width: 200px;"
            />
            <div v-else class="static-field">{{ user.username }}</div>
            <div class="edit-actions">
              <template v-if="!editing.username">
                <button @click="startEditing('username')" class="edit-btn">
                  <i class="icon-edit">✏️</i>
                </button>
              </template>
              <template v-else>
                <button @click="saveEdit('username')" class="confirm-btn">
                  <i class="icon-check">✓</i>
                </button>
                <button @click="cancelEdit('username')" class="cancel-btn">
                  <i class="icon-close">✕</i>
                </button>
              </template>
            </div>
          </div>
        </div>
        
        <!-- 密码修改 -->
        <div class="form-group">
          <label>修改密码</label>
          <div class="editable-field">
            <input
              v-if="editing.password"
              v-model="editForm.password"
              type="password"
              class="form-input"
              placeholder="输入新密码"
              ref="passwordInput"
              style="width: 200px;"
            />
            <div v-else class="static-field" style="width: 200px;">点击右侧编辑</div>
            <div class="edit-actions">
              <template v-if="!editing.password">
                <button @click="startEditing('password')" class="edit-btn">
                  <i class="icon-edit">✏️</i>
                </button>
              </template>
              <template v-else>
                <button @click="saveEdit('password')" class="confirm-btn">
                  <i class="icon-check">✓</i>
                </button>
                <button @click="cancelEdit('password')" class="cancel-btn">
                  <i class="icon-close">✕</i>
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import axios from 'axios' // 引入 axios

const router = useRouter()
const toast = useToast()

// Token验证
const hasToken = ref(false)

// 从token解析的用户数据
interface UserData {
  username: string
  email: string
}

// 当前用户数据
const user = ref<UserData>({
  username: '',
  email: ''
})

// 编辑表单
const editForm = ref({
  username: '',
  password: ''
})

// 编辑状态
const editing = ref({
  username: false,
  password: false
})

// DOM引用
const usernameInput = ref<HTMLInputElement | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)

// 检查Token
const checkToken = () => {
  const token = localStorage.getItem('token')
  hasToken.value = !!token
  return token
}
const useremail = ref("")
// 从token解析用户数据
const parseUserFromToken = () => {
  const token = checkToken()
  if (token) {
    try {
      // 假设token是JWT格式，解析payload部分
      const payload = JSON.parse(atob(token.split('.')[1]))
      user.value = {
        username: payload.username || payload.name || '用户',
        email: payload.email || '未设置邮箱'
      }
      useremail.value = payload.email
      // 初始化编辑表单
      editForm.value.username = user.value.username
    } catch (e) {
      console.error('解析token失败:', e)
      toast.error('用户信息解析失败')
    }
  }
}

// 开始编辑
const startEditing = (field: 'username' | 'password') => {
  editing.value[field] = true
  // 重置编辑表单
  if (field === 'username') {
    editForm.value.username = user.value.username
  } else {
    editForm.value.password = ''
  }

  // 自动聚焦输入框
  nextTick(() => {
    const inputRef = field === 'username' ? usernameInput.value : passwordInput.value
    inputRef?.focus()
  })
}

// 保存编辑
const saveEdit = async (field: 'username' | 'password') => {
  const token = checkToken()
  if (!token) {
    toast.error('未登录，无法保存')
    return
  }

  if (field === 'username') {
    if (!editForm.value.username.trim()) {
      toast.error('用户名不能为空')
      return
    }

    try {
      const response = await axios.post(
        '/api/changeUsername',
        { newName: editForm.value.username,
          email:useremail
         },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.status === 200 && response.data.message === 'name updated successfully') {
        toast.success('用户名更新成功')
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error('更新用户名失败: ' + (response.data.error || '未知错误'))
      }
    } catch (error) {
      toast.error('更新用户名失败: ' + (error as Error).message)
    }
  } else if (field === 'password') {
    if (!editForm.value.password || editForm.value.password.length < 6) {
      toast.error('密码长度不能少于6位')
      return
    }

    try {
      const response = await axios.post(
        '/api/changepassword',
        { newPassword: editForm.value.password,
          email : useremail.value
         },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.status === 200 && response.data.message === 'password updated successfully') {
        toast.success('密码更新成功')
        editForm.value.password = '' // 清空密码输入框
      } else {
        toast.error('更新密码失败: ' + (response.data.error || '未知错误'))
      }
    } catch (error) {
      toast.error('更新密码失败: ' + (error as Error).message)
    }
  }

  editing.value[field] = false
}

// 取消编辑
const cancelEdit = (field: 'username' | 'password') => {
  editing.value[field] = false
}


// 前往登录
const goToLogin = () => {
  router.push('/login')
}

// 初始化
onMounted(() => {
  parseUserFromToken()
})
</script>

<style scoped>
.settings-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.error-message {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.error-message h2 {
  color: #f44336;
  margin-bottom: 15px;
}

.error-message p {
  margin-bottom: 20px;
  color: #555;
}

.login-btn {
  padding: 12px 25px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #45a049;
}

.settings-card {
  width: 100%;
  max-width: 500px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.settings-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
}

.static-field {
  padding: 12px 15px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: #f9f9f9;
  min-height: 44px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.editable-field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-input {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.edit-actions {
  display: flex;
  gap: 5px;
}

.edit-btn, .confirm-btn, .cancel-btn {
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition: all 0.2s;
  width: 36px;
  height: 36px;
}

.edit-btn:hover {
  background-color: #f0f0f0;
}

.confirm-btn {
  color: #4CAF50;
}

.confirm-btn:hover {
  background-color: rgba(76, 175, 80, 0.1);
}

.cancel-btn {
  color: #f44336;
}

.cancel-btn:hover {
  background-color: rgba(244, 67, 54, 0.1);
}

.icon-edit, .icon-check, .icon-close {
  font-size: 18px;
  line-height: 1;
}
</style>
<script lang="ts">
export default {
  name: 'lol-setting',
};
</script>