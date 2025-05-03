<template>
    <div class="page-container">
      <div class="login-container">
        <h2 class="login-title">登录</h2>
        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="username">邮箱 </label>
            <input
              type="text"
              id="username"
              v-model="form.username"
              @blur="validateField('username')"
              :class="{ 'is-invalid': errors.username }"
            />
            <div v-if="errors.username" class="invalid-feedback">
              {{ errors.username }}
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">密码</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              @blur="validateField('password')"
              :class="{ 'is-invalid': errors.password }"
            />
            <div v-if="errors.password" class="invalid-feedback">
              {{ errors.password }}
            </div>
          </div>
          
          <div class="button-group">
            <button type="submit" :disabled="isSubmitting" class="login-btn">
              <span v-if="!isSubmitting">登录</span>
              <span v-else>登录中...</span>
            </button>
            <button type="button" @click="goToRegister" class="register-btn">
              注册
            </button>
          </div>
          
          <div v-if="errorMessage" class="alert alert-danger mt-3">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  
  // 表单数据
  const form = ref({
    username: '',
    password: ''
  });
  
  // 错误信息
  const errors = ref({
    username: '',
    password: ''
  });
  
  // 提交状态
  const isSubmitting = ref(false);
  const errorMessage = ref('');
  
  // 表单验证规则
  const rules = {
    username: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入有效的邮箱地址' }
    ],
    password: [
      { required: true, message: '请输入密码' },
      { min: 6, message: '密码至少6个字符' }
    ]
  };
  
  // 验证单个字段
  const validateField = (field) => {
    const value = form.value[field];
    errors.value[field] = '';
    
    for (const rule of rules[field]) {
      if (rule.required && !value) {
        errors.value[field] = rule.message;
        break;
      }
      
      if (rule.min && value.length < rule.min) {
        errors.value[field] = rule.message;
        break;
      }
    }
  };
  
  // 验证整个表单
  const validateForm = () => {
    Object.keys(form.value).forEach(field => {
      validateField(field);
    });
    
    return !Object.values(errors.value).some(error => error);
  };
  
  // 提交表单
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    isSubmitting.value = true;
    errorMessage.value = '';
    
    try {
      console.log(form.value.username);
      const response = await axios.post('/api/login', {
        email: form.value.username,
        password: form.value.password
      });
      
      // 登录成功处理
      localStorage.setItem('token', response.data.token);
      
      // 跳转到首页或其他页面
      router.push('/');
      
    } catch (error) {
      if (error.response) {
        // 服务器返回的错误
        if (error.response.data.errors) {
          // 表单字段错误
          Object.keys(error.response.data.errors).forEach(field => {
            errors.value[field] = error.response.data.errors[field];
          });
        } else {
          // 通用错误消息
          errorMessage.value = error.response.data.message || '登录失败';
        }
      } else {
        // 网络或其他错误
        errorMessage.value = '网络错误，请稍后重试';
      }
    } finally {
      isSubmitting.value = false;
    }
  };
  
  // 跳转到注册页面
  const goToRegister = () => {
    router.push('/register');
  };
  </script>
<script>
  export default {
    name: 'login-page',
  };
</script>
  <style scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .login-container {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .login-title {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  label {
    font-weight: 500;
    color: #555;
  }
  
  input {
    padding: 0.7rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.95rem;
    transition: border-color 0.3s;
  }
  
  input:focus {
    border-color: #4CAF50;
    outline: none;
  }
  
  input.is-invalid {
    border-color: #dc3545;
  }
  
  .invalid-feedback {
    color: #dc3545;
    font-size: 0.85rem;
    margin-top: 0.2rem;
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }
  
  .login-btn, .register-btn {
    flex: 1;
    padding: 0.6rem;
    border: none;
    border-radius: 4px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .login-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .login-btn:hover {
    background-color: #45a049;
  }
  
  .login-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .register-btn {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
  }
  
  .register-btn:hover {
    background-color: #e0e0e0;
  }
  
  .alert {
    padding: 0.75rem 1rem;
    border-radius: 4px;
  }
  
  .alert-danger {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  </style>