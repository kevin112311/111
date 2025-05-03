<template>
    <div class="page-container">
      <div class="register-container">
        <h2 class="register-title">注册新账号</h2>
        <form @submit.prevent="handleSubmit" class="register-form">
          <div class="form-group">
            <label for="username">用户名</label>
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
            <label for="email">电子邮箱</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              @blur="validateField('email')"
              :class="{ 'is-invalid': errors.email }"
            />
            <div v-if="errors.email" class="invalid-feedback">
              {{ errors.email }}
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
          
          <div class="form-group">
            <label for="confirmPassword">确认密码</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="form.confirmPassword"
              @blur="validatePasswordMatch"
              :class="{ 'is-invalid': errors.confirmPassword }"
            />
            <div v-if="errors.confirmPassword" class="invalid-feedback">
              {{ errors.confirmPassword }}
            </div>
          </div>
          
          <div class="button-group">
            <button type="submit" :disabled="isSubmitting" class="register-btn">
              <span v-if="!isSubmitting">注册</span>
              <span v-else>注册中...</span>
            </button>
            <button type="button" @click="goToLogin" class="login-btn">
              返回登录
            </button>
          </div>
          
          <div v-if="successMessage" class="alert alert-success mt-3">
            {{ successMessage }}
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
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // 错误信息
  const errors = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // 提交状态
  const isSubmitting = ref(false);
  const errorMessage = ref('');
  const successMessage = ref('');
  
  // 表单验证规则
  const rules = {
    username: [
      { required: true, message: '请输入用户名' },
      { min: 3, message: '用户名至少3个字符' },
      { max: 20, message: '用户名最多20个字符' }
    ],
    email: [
      { required: true, message: '请输入电子邮箱' },
      { 
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 
        message: '请输入有效的电子邮箱' 
      }
    ],
    password: [
      { required: true, message: '请输入密码' },
      { min: 8, message: '密码至少8个字符' },
      { 
        validator: (value) => /[A-Z]/.test(value), 
        message: '密码必须包含至少一个大写字母' 
      },
      { 
        validator: (value) => /[0-9]/.test(value), 
        message: '密码必须包含至少一个数字' 
      }
    ],
    confirmPassword: [
      { required: true, message: '请确认密码' }
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
      
      if (rule.max && value.length > rule.max) {
        errors.value[field] = rule.message;
        break;
      }
      
      if (rule.validator && !rule.validator(value)) {
        errors.value[field] = rule.message;
        break;
      }
    }
  };
  
  // 验证密码匹配
  const validatePasswordMatch = () => {
    errors.value.confirmPassword = '';
    if (form.value.password !== form.value.confirmPassword) {
      errors.value.confirmPassword = '两次输入的密码不一致';
    }
  };
  
  // 验证整个表单
  const validateForm = () => {
    Object.keys(form.value).forEach(field => {
      if (field !== 'confirmPassword') {
        validateField(field);
      }
    });
    
    validatePasswordMatch();
    
    return !Object.values(errors.value).some(error => error);
  };
  
  // 提交表单
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    isSubmitting.value = true;
    errorMessage.value = '';
    successMessage.value = '';
    
    try {
      const response = await axios.post('/api/register', {
        name: form.value.username,
        email: form.value.email,
        password: form.value.password,
        type: 1
      });
      
      // 注册成功处理
      successMessage.value = '注册成功！正在跳转到登录页面...';
      
      // 3秒后跳转到登录页
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (error) {
      if (error.response) {
        // 服务器返回的错误
        if (error.response.data.errors) {
          console.log(error.response)
          // 表单字段错误
          Object.keys(error.response.data.errors).forEach(field => {
            errors.value[field] = error.response.data.errors[field];
          });
        } else {
          // 通用错误消息
          errorMessage.value = error.response.data.message || '注册失败';
        }
      } else {
        // 网络或其他错误
        errorMessage.value = '网络错误，请稍后重试';
      }
    } finally {
      isSubmitting.value = false;
    }
  };
  
  // 跳转到登录页面
  const goToLogin = () => {
    router.push('/login');
  };
  </script>
  <script>
  export default {
    name: 'register-page',
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
  
  .register-container {
    width: 100%;
    max-width: 450px;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .register-title {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .register-form {
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
    margin-top: 1rem;
  }
  
  .register-btn, .login-btn {
    flex: 1;
    padding: 0.6rem;
    border: none;
    border-radius: 4px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .register-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .register-btn:hover {
    background-color: #45a049;
  }
  
  .register-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .login-btn {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
  }
  
  .login-btn:hover {
    background-color: #e0e0e0;
  }
  
  .alert {
    padding: 0.75rem 1rem;
    border-radius: 4px;
    margin-top: 1rem;
  }
  
  .alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  .alert-danger {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  </style>